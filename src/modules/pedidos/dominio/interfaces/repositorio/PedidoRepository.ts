import {
  EstadosPago,
  EstadosPedido,
  Pedido,
} from 'src/modules/pedidos/infraestructura/entities/pedido.entity';
import { PedidoDto } from '../../dto/pedido.dto';

export interface PedidoRepository {
  obtenerTodos(): Promise<PedidoDto[]>;
  crearPedido(pedido: PedidoDto);
  confirmarPedido(pedidoId: string): Promise<Pedido>;
  getByEstado(estado: EstadosPedido): Promise<PedidoDto[]>;
  changeEstado(id: number, estado: EstadosPedido): Promise<PedidoDto>;
  changeEstadoPago(id: number, estado: EstadosPago): Promise<PedidoDto>;
}
