import { Sabor } from 'src/sabores/infraestructura/entities/sabore.entity';
import { SaborDto } from '../dto/sabor.dto';

export interface SaboresRepository {
  obtenerTodos(): Promise<SaborDto[]>;
  alta(sabor: Sabor): Promise<SaborDto>;
}
