import { ProductoSabor } from 'src/modules/productos/infraestructura/entities/producto-sabor.entity';
import { SaborDto } from '../dto/sabor.dto';
import { SaborInterface } from '../interfaces/SaborInterface';

export class SaborMapper {
  static toDto(sabor: ProductoSabor): SaborDto {
    return {
      id: sabor.id,
      nombre: sabor.sabor.nombre,
      cantidad: sabor.cantidad,
    };
  }
  static toPrimitives(sabor: SaborDto): SaborInterface {
    return {
      id: sabor.id,
      nombre: sabor.nombre,
    };
  }
}
