import { Preference } from 'mercadopago';
import { Pedido } from './entities/pedido.entity';
import mercadopago from 'src/lib/mercadopago';
import { ClientePersona } from 'src/modules/cliente/infraestructura/entities/cliente-persona.entity';
import { ClienteEmpresa } from 'src/modules/cliente/infraestructura/entities/cliente-empresa.entity';

export class PedidosService {
  constructor() {}

  obtenerPedidos() {
    return [];
  }

  async crearPreferenciaDesdePedido(pedido: Pedido): Promise<string> {
    const preferenceClient = new Preference(mercadopago);
    const items = pedido.detallesPedidos.map((detalle) => ({
      id: detalle.producto.id.toString(),
      title: detalle.producto.nombre,
      quantity: detalle.cantidad,
      unit_price:
        pedido.cliente instanceof ClientePersona
          ? detalle.producto.precioPersonas
          : detalle.producto.precioEmpresas,
    }));

    const preference = {
      purpose: 'wallet_purchase',
      items,
      payer: {
        name:
          pedido.cliente instanceof ClientePersona
            ? pedido.cliente.nombre + ' ' + pedido.cliente.apellido
            : pedido.cliente instanceof ClienteEmpresa
              ? pedido.cliente.nombreEmpresa
              : '',
        email: pedido.cliente.email,
      },
      back_urls: {
        success: 'https://tuapp.com/success',
        failure: 'https://tuapp.com/failure',
        pending: 'https://tuapp.com/pending',
      },
      auto_return: 'approved',
    };

    const response = await preferenceClient.create({ body: preference });
    return response.id;
  }
}
