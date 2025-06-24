import { Pedido } from 'src/modules/pedidos/infraestructura/entities/pedido.entity';

export interface PedidoRepository {
  obtenerTodos(): Pedido[] | PromiseLike<Pedido[]>;
  pagarPedido(pedido: Pedido): Promise<object>;
}
