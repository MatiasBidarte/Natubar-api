import { Pedido } from '../../infraestructura/entities/pedido.entity';
import { PedidoDto } from '../dto/pedido.dto';
import { DetallePedidoMapper } from './detalle-pedido-mapper';
import { DetallePedido } from '../../infraestructura/entities/detalle-pedido.entity';

export class PedidoMapper {
  static toDto(pedido: Pedido): PedidoDto {
    return new PedidoDto(
      pedido.id,
      pedido.fechaCreacion,
      pedido.fechaEntrega,
      pedido.fechaEntregaEstimada,
      pedido.montoTotal,
      pedido.descuento,
      pedido.estado,
      pedido.detallesPedidos.map((detalle: DetallePedido) =>
        DetallePedidoMapper.toDto(detalle),
      ),
    );
  }
}
