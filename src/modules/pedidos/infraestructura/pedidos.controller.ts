import {
  Body,
  Controller,
  Get,
  InternalServerErrorException,
  Param,
  Post,
} from '@nestjs/common';
import { PedidoDto } from '../dominio/dto/pedido.dto';
import { CrearPedido } from '../dominio/casosDeUso/CrearPedido';
import { ConfirmarPedido } from '../dominio/casosDeUso/ConfirmarPedido';
import axios from 'axios';
import { MercadoPagoConfig, Preference } from 'mercadopago';
import { EstadosPago, EstadosPedido, Pedido } from './entities/pedido.entity';
import { GetByEstado } from '../dominio/casosDeUso/GetByEstado';
import { ClienteDto } from 'src/modules/cliente/dominio/dto/cliente.dto';
import { ChangeEstado } from '../dominio/casosDeUso/ChangeEstado';
import { ChangeEstadoPago } from '../dominio/casosDeUso/ChangeEstadoPago';

export class WebhookDto {
  topic: 'payment' | 'merchant_order';
  data?: {
    id?: string;
  };
  resource?: string;
}
interface MercadoPagoOrderResponse {
  payments: Array<{
    id: string;
    status: string;
    [key: string]: any; // si querés flexibilidad
  }>;
  // otros campos si los necesitás
}
export interface MercadoPagoPayment {
  id: string;
  status: EstadosPedido;
  preference_id: string;
  payer?: {
    email?: string;
    identification?: {
      type?: string;
      number?: string;
    };
  };
  transaction_amount?: number;
}
@Controller('pedidos')
export class PedidosController {
  constructor(
    private readonly crear: CrearPedido,
    private readonly confirmar: ConfirmarPedido,
    private readonly getByEstado: GetByEstado,
    private readonly changeEstado: ChangeEstado,
    private readonly changeEstadoPago: ChangeEstadoPago,
  ) {}
  @Get('PedidosPorEstado/:estadoRaw')
  async getPedidos(@Param('estadoRaw') estadoRaw: string): Promise<Pedido[]> {
    if (estadoRaw == null) {
      return [];
    }
    const estado = estadoRaw as EstadosPedido;
    const pedidos: Pedido[] = await this.getByEstado.ejecutar(estado);
    return pedidos;
  }

  @Post()
  async crearPedido(@Body() body: PedidoDto): Promise<{ id: number }> {
    return await this.crear.ejecutar(body);
  }

  @Post('crear-preferencia')
  async crearPreferencia(@Body() body: PedidoDto) {
    try {
      const accessToken = process.env.MP_ACCESS_TOKEN;
      if (!accessToken) {
        throw new InternalServerErrorException(
          'MercadoPago access token is not defined',
        );
      }
      const client = new MercadoPagoConfig({
        accessToken,
      });

      const pedidoDePrueba: PedidoDto = {
        id: 999,
        fechaCreacion: new Date(),
        fechaEntrega: new Date(),
        fechaEntregaEstimada: new Date(Date.now() + 86400000),
        montoTotal: 1000,
        descuento: 0,
        estado: EstadosPedido.pendientePago,
        productos: [
          {
            id: 1,
            cantidad: 2,
            nombre: 'Barra de Cereal Energética',
            descripcion:
              'Una mezcla perfecta de avena, miel y almendras para recargar tu energía.',
            precioEmpresas: 300,
            precioPersonas: 400,
            stock: true,
            esCajaDeBarras: false,
            sabores: [],
          },
          {
            cantidad: 1,
            id: 2,
            nombre: 'Barra Proteica Choco-Nuez',
            descripcion:
              'Deliciosa barra alta en proteínas con cacao y nueces.',
            precioEmpresas: 500,
            precioPersonas: 600,
            stock: true,
            esCajaDeBarras: true,
            sabores: [
              {
                id: 1,
                nombre: 'Chocolate',
                cantidad: 6,
              },
              {
                id: 2,
                nombre: 'Frutos Secos',
                cantidad: 6,
              },
            ],
          },
        ],

        cliente: {
          id: 1,
          email: 'prueba1@gmail.com',
          contrasena: 'Montevideo111!',
          observaciones: 'AAAA',
          departamento: 'Montevideo',
          ciudad: 'Montevideo',
          direccion: 'Calle Falsa 123',
          telefono: '123456789',
        } as ClienteDto,
      };
      body = pedidoDePrueba;
      const preferenceClient = new Preference(client);
      const items = (body.productos ?? []).map((detalle) => ({
        id: detalle.id.toString(),
        title: detalle.nombre,
        quantity: detalle.cantidad,
        unit_price:
          body.cliente.tipo === 'Persona'
            ? detalle.precioPersonas
            : detalle.precioEmpresas,

        currency_id: 'UYU',
      }));

      const preference = await preferenceClient.create({
        //cambiar por la url
        body: {
          items,
          notification_url:
            'https://fc461ef1ab52.ngrok-free.app/pedidos/webhook-mercadopago',
          back_urls: {
            success: 'https://natubar.vercel.app/',
          },
          auto_return: 'approved',
        },
      });
      body.preferenceId = preference.id || '';
      await this.crear.ejecutar(body);
      return { preferenceId: preference.id };
    } catch (error: any) {
      console.log(error);
    }
  }

  @Post('webhook-mercadopago')
  async mercadopagoWebhook(@Body() body: WebhookDto) {
    let paymentId: string | null = null;
    if (body.topic === 'payment' && body.data?.id) {
      paymentId = body.data.id;
    } else if (body.topic === 'merchant_order' && body.resource) {
      const accessToken = process.env.MP_ACCESS_TOKEN;
      const orderResponse = await axios.get<MercadoPagoOrderResponse>(
        body.resource,
        {
          headers: { Authorization: `Bearer ${accessToken}` },
        },
      );
      const payments = orderResponse.data.payments;
      paymentId = payments?.[0]?.id ?? null;
    }

    if (!paymentId) {
      return { received: false, error: 'No paymentId found' };
    }

    const accessToken = process.env.MP_ACCESS_TOKEN;
    const paymentResponse = await axios.get<MercadoPagoPayment>(
      `https://api.mercadopago.com/v1/payments/${paymentId}`,
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      },
    );

    const payment = paymentResponse.data;
    if (payment.status === EstadosPedido.enPreparacion) {
      const preferenceId = payment.preference_id;
      await this.confirmar.ejecutar(preferenceId);
    }

    return { received: true };
  }

  @Post('CambiarEstado')
  async CambiarEstado(@Body() body: { estado: EstadosPedido; pedido: number }) {
    const { estado, pedido } = body;
    const pedidoActualizado = await this.changeEstado.ejecutar(pedido, estado);
    return pedidoActualizado;
  }

  @Post('CambiarEstadoPago')
  async CambiarEstadoPago(
    @Body() body: { estado: EstadosPago; pedido: number },
  ) {
    const { estado, pedido } = body;
    const pedidoActualizado = await this.changeEstadoPago.ejecutar(
      pedido,
      estado,
    );
    return pedidoActualizado;
  }
}
