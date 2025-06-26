import {
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { PedidoDto } from '../dominio/dto/pedido.dto';
import { CrearPedido } from '../dominio/casosDeUso/CrearPedido';
import { ClienteDto } from 'src/modules/cliente/dominio/dto/cliente.dto';
import mercadopago from 'src/lib/mercadopago';
import { ConfirmarPedido } from '../dominio/casosDeUso/ConfirmarPedido';
import axios from 'axios';
import { MercadoPagoConfig, Preference } from 'mercadopago';
@Controller('pedidos')
export class PedidosController {
  constructor(
    private readonly crear: CrearPedido,
    private readonly confirmar: ConfirmarPedido,
  ) {}

  @Post('crear-preferencia')
  async crearPreferencia(@Body() body) {
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
      fechaEntrega: new Date(),
      fechaEntregaEstimada: new Date(Date.now() + 86400000),
      montoTotal: 1000,
      descuento: 0,
      detalleProductos: [
        {
          id: 1,
          cantidad: 2,
          producto: {
            id: 1,
            nombre: 'Barra de Cereal Energética',
            descripcion:
              'Una mezcla perfecta de avena, miel y almendras para recargar tu energía.',
            precioEmpresas: 300,
            precioPersonas: 400,
            stock: true,
          },
        },
        {
          id: 2,
          cantidad: 1,
          producto: {
            id: 2,
            nombre: 'Barra Proteica Choco-Nuez',
            descripcion:
              'Deliciosa barra alta en proteínas con cacao y nueces.',
            precioEmpresas: 500,
            precioPersonas: 600,
            stock: true,
          },
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
    const preferenceClient = new Preference(client);

    const items = (pedidoDePrueba.detalleProductos ?? []).map((detalle) => ({
      id: detalle.producto.id.toString(),
      title: detalle.producto.nombre,
      quantity: detalle.cantidad,
      unit_price: detalle.producto.precioPersonas,
      currency_id: 'UYU',
    }));

    const preference = await preferenceClient.create({
      body: {
        items,
        notification_url:
          'https://7644-2800-a4-1f3e-7200-a4f5-b98-9ff-36b3.ngrok-free.app/pedidos/webhook-mercadopago',
      },
    });
    pedidoDePrueba.preferenceId = preference.id;
    await this.crear.ejecutar(pedidoDePrueba);
    console.log('Preferencia creada:', preference);
    return { preferenceId: preference.id };
  }

  @Post('webhook-mercadopago')
  async mercadopagoWebhook(@Body() body: any) {
    console.log('Webhook de MercadoPago recibido:', body);
    if (body.topic === 'payment' && body.data?.id) {
      const paymentId = body.data.id;
      // ...tu lógica actual...
    } else if (body.topic === 'merchant_order' && body.resource) {
      // Obtener la orden y buscar los pagos asociados
      const accessToken = process.env.MP_ACCESS_TOKEN;
      const orderResponse = await axios.get(body.resource, {
        headers: { Authorization: `Bearer ${accessToken}` },
      });
      const payments = orderResponse.data.payments;
      // Puedes iterar sobre los pagos y procesarlos si lo necesitas
      console.log('Pagos asociados a la orden:', payments);
      // Obtener el primer paymentId si existe
      const paymentId = payments && payments.length > 0 ? payments[0].id : null;
      if (!paymentId) {
        console.log('No se encontró paymentId en los pagos asociados.');
        return { received: false, error: 'No paymentId found' };
      }
      // 2. Consultar la API de Mercado Pago
      const paymentResponse = await axios.get(
        `https://api.mercadopago.com/v1/payments/${paymentId}`,
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        },
      );
      const payment = paymentResponse.data;

      if (payment.status === 'approved') {
        const preferenceId = payment.preference_id;

        await this.confirmar.ejecutar(preferenceId);
      }
      return { received: true };
    }
  }
}
