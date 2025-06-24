import { Pedido } from '../../infraestructura/entities/pedido.entity';
import { PedidoDto } from '../dto/pedido.dto';
import { DetallePedidoMapper } from './detalle-pedido-mapper';
import { DetallePedido } from '../../infraestructura/entities/detalle-pedido.entity';
import { ClienteMapper } from 'src/modules/cliente/dominio/mapper/UsuarioMapper';

export class PedidoMapper {
  static toDto(pedido: Pedido): PedidoDto {
    return new PedidoDto(
      pedido.id,
      pedido.fechaEntrega,
      pedido.fechaEntregaEstimada,
      pedido.montoTotal,
      pedido.descuento,
      pedido.detallesPedidos.map((detalle: DetallePedido) =>
        DetallePedidoMapper.toDto(detalle),
      ),
      ClienteMapper.toDto(pedido.cliente),
    );
  }
  static toDomain(raw: PedidoDto): Pedido {
    const pedido = new Pedido();
    pedido.id = raw.id;
    pedido.fechaEntrega = raw.fechaEntrega;
    pedido.fechaEntregaEstimada = raw.fechaEntregaEstimada;
    pedido.montoTotal = raw.montoTotal;
    pedido.descuento = raw.descuento;
    pedido.detallesPedidos =
      raw.productos?.map((detalleDto) =>
        DetallePedidoMapper.toDomain(detalleDto),
      ) || [];
    pedido.cliente = ClienteMapper.toDomain(raw.cliente);
    return pedido;
  }
}
