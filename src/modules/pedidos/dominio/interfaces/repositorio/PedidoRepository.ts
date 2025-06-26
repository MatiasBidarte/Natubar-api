import { Pedido } from 'src/modules/pedidos/infraestructura/entities/pedido.entity';
import { PedidoDto } from '../../dto/pedido.dto';

export interface PedidoRepository {
  obtenerTodos(): Pedido[] | PromiseLike<Pedido[]>;
  crearPedido(pedido: PedidoDto);
  confirmarPedido(preferenceId: string): Promise<Pedido>;
}
