import {
  EstadosPedido,
  Pedido,
} from 'src/modules/pedidos/infraestructura/entities/pedido.entity';
import { PedidoDto } from '../../dto/pedido.dto';

export interface PedidoRepository {
  obtenerTodos(): Pedido[] | PromiseLike<Pedido[]>;
  crearPedido(pedido: PedidoDto);
  confirmarPedido(pedidoId: string): Promise<Pedido>;
  getByEstado(estado: EstadosPedido): Promise<Pedido[]>;
  changeEstado(id: number, estado: EstadosPedido): Promise<Pedido>;
}
