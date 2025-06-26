import { ProductoMapper } from 'src/modules/productos/dominio/mappers/producto-mapper';
import { DetallePedido } from '../../infraestructura/entities/detalle-pedido.entity';
import { DetallePedidoDto } from '../dto/detalle-pedido.dto';
import { SaborMapper } from 'src/modules/sabores/dominio/mappers/sabor-mapper';

export class DetallePedidoMapper {
  static toDto(detallePedido: DetallePedido): DetallePedidoDto {
    return {
      cantidad: detallePedido.cantidad,
      ...ProductoMapper.toDto(detallePedido.producto),
      sabores: detallePedido.productoSabores.map((sabor) =>
        SaborMapper.toDto(sabor),
      ),
    };
  }
}
