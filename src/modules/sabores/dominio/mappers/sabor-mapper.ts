import { Sabor } from '../../infraestructura/entities/sabor.entity';
import { SaborDto } from '../dto/sabor.dto';
import { SaborInterface } from '../interfaces/SaborInterface';

export class SaborMapper {
  static toDto(sabor: Sabor): SaborDto {
    return {
      id: sabor.id,
      nombre: sabor.nombre,
    };
  }
  static toPrimitives(sabor: SaborDto): SaborInterface {
    return {
      id: sabor.id,
      nombre: sabor.nombre,
    };
  }
}
