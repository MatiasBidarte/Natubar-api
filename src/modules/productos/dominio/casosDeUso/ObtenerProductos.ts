import { forwardRef, Inject } from '@nestjs/common';
import { ProductoDto } from '../dto/producto.dto';
import { ProductosRepository } from '../interfaces/ProductosRepository';
import { ApiRestProductosRepository } from '../../infraestructura/ApiRestProductosRepository';

export class ObtenerProductos {
  constructor(
    @Inject(forwardRef(() => ApiRestProductosRepository))
    private readonly productosRepository: ProductosRepository,
  ) {}

  async ejecutar(): Promise<ProductoDto[]> {
    return await this.productosRepository.obtenerTodos();
  }
}
