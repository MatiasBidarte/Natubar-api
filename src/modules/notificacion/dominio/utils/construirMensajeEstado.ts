import { EstadosPedido } from 'src/modules/pedidos/infraestructura/entities/pedido.entity';

export function construirMensajeEstado(estado: EstadosPedido): string {
  switch (estado) {
    case EstadosPedido.enCamino:
      return 'Tu pedido está en camino 🚚';
    case EstadosPedido.entregado:
      return '¡Tu pedido fue entregado! 🎉';
    default:
      return `Tu pedido está en estado: ${estado}`;
  }
}
