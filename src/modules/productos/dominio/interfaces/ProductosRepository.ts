import { ProductoDto } from '../dto/producto.dto';

export interface ProductosRepository {
  obtenerTodos(): Promise<ProductoDto[]>;
}
