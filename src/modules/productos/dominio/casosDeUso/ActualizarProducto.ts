import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ProductosRepository } from '../interfaces/ProductosRepository';
import { ProductoDto } from '../dto/producto.dto';
import { CrearActualizarProductoDto } from '../dto/crearActualizarProductoDto';
import { ApiRestProductosRepository } from '../../infraestructura/ApiRestProductosRepository';

@Injectable()
export class ActualizarProducto {
  constructor(
    @Inject(forwardRef(() => ApiRestProductosRepository))
    private readonly productosRepository: ProductosRepository,
  ) {}

  async ejecutar(
    id: number,
    productoDto: CrearActualizarProductoDto,
  ): Promise<ProductoDto> {
    return await this.productosRepository.actualizar(id, productoDto);
  }
}
