import { Sabor } from '../../infraestructura/entities/sabor.entity';

export interface SaboresRepository {
  obtenerTodos(): Promise<Sabor[]>;
}
