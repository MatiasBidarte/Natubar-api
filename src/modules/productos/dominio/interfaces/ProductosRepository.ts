import { CrearActualizarProductoDto } from '../dto/crearActualizarProductoDto';
import { ProductoDto } from '../dto/producto.dto';

export interface ProductosRepository {
  obtenerTodos(): Promise<ProductoDto[]>;
  obtenerTodosParaAdministrador(): Promise<ProductoDto[]>;
  crear(productoDto: CrearActualizarProductoDto): Promise<ProductoDto>;
  actualizar(
    id: number,
    productoDto: CrearActualizarProductoDto,
  ): Promise<ProductoDto>;
  desactivar(id: number): Promise<void>;
}
