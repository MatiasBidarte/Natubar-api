import { Sabor } from 'src/modules/sabores/infraestructura/entities/sabore.entity';
import { SaborDto } from '../dto/sabor.dto';

export interface SaboresRepository {
  obtenerTodos(): Promise<SaborDto[]>;
  alta(sabor: Sabor): Promise<SaborDto>;
}
