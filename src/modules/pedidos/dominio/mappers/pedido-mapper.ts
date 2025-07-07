import { Pedido } from '../../infraestructura/entities/pedido.entity';
import { PedidoDto } from '../dto/pedido.dto';

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
      [],
    );
  }
  static toDomain(raw: PedidoDto): Pedido {
    const pedido = new Pedido(
      raw.id,
      raw.fechaEntrega,
      raw.fechaEntregaEstimada,
      raw.montoTotal,
      raw.descuento,
      undefined,
      raw.preferenceId,
    );
    return pedido;
  }
}
