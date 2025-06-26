import { ProductoMapper } from 'src/modules/productos/dominio/mappers/producto-mapper';
import { DetallePedido } from '../../infraestructura/entities/detalle-pedido.entity';
import { DetallePedidoDto } from '../dto/detalle-pedido.dto';

export class DetallePedidoMapper {
  static toDto(detallePedido: DetallePedido): DetallePedidoDto {
    return {
      id: detallePedido.id,
      cantidad: detallePedido.cantidad,
      producto: ProductoMapper.toDto(detallePedido.producto),
    };
  }
  static toDomain(raw: DetallePedidoDto): DetallePedido {
    const detalle = new DetallePedido();
    detalle.id = raw.id;
    detalle.cantidad = raw.cantidad;
    return detalle;
  }
}
