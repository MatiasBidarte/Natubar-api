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
import { EstadosPedido, Pedido } from './entities/pedido.entity';
import { GetByEstado } from '../dominio/casosDeUso/GetByEstado';
import { ICrearPreferencia } from './interfaces/ICrearPreferencia';
import { ClienteDto } from 'src/modules/cliente/dominio/dto/cliente.dto';
import { Console } from 'console';
import { ChangeEstado } from '../dominio/casosDeUso/ChangeEstado';

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
  status: string;
  preference_id: string;
  payer?: {
    email?: string;
    identification?: {
      type?: string;
      number?: string;
    };
  };
  transaction_amount?: number;
  external_reference?: string;
}
@Controller('pedidos')
export class PedidosController {
  constructor(
    private readonly crear: CrearPedido,
    private readonly confirmar: ConfirmarPedido,
    private readonly getByEstado: GetByEstado,
    private readonly changeEstado: ChangeEstado,
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
  async crearPreferencia(@Body() body: ICrearPreferencia) {
    const accessToken = process.env.MP_ACCESS_TOKEN;
    if (!accessToken) {
      throw new InternalServerErrorException(
        'MercadoPago access token is not defined',
      );
    }
    const client = new MercadoPagoConfig({
      accessToken,
    });

    const preferenceClient = new Preference(client);
    const items = (body.productos ?? []).map((producto) => ({
      ...producto,
      currency_id: 'UYU',
    }));

    const preference = await preferenceClient.create({
      body: {
        items,
        notification_url:
          'https://natubar-api-production.up.railway.app/pedidos/webhook-mercadopago',
        back_urls: {
          success: 'https://natubar.vercel.app',
        },
        shipments: {
          cost: body.envio,
        },
        external_reference: body.pedidoId.toString(),
      },
    });
    return { preferenceId: preference.id };
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
    if (payment.status === 'approved') {
      const pedidoId = payment.external_reference;
      await this.confirmar.ejecutar(pedidoId ?? '');
    }
    return { received: true };
  }

  @Post('cambiarEstado')
  async cambiarEstado(@Body() estadoRaw: string, id: number) {
    const estado = estadoRaw as EstadosPedido;
    const pedido: Pedido = await this.changeEstado.ejecutar(id, estado);
    return pedido;
  }
}
