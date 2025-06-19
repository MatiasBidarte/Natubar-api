import { SaborDto } from '../dto/sabor.dto';

export interface SaboresRepository {
  obtenerTodos(): Promise<SaborDto[]>;
}
