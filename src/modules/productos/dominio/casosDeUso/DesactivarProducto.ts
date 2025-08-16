import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ProductosRepository } from '../interfaces/ProductosRepository';
import { ApiRestProductosRepository } from '../../infraestructura/ApiRestProductosRepository';

@Injectable()
export class DesactivarProducto {
  constructor(
    @Inject(forwardRef(() => ApiRestProductosRepository))
    private readonly productosRepository: ProductosRepository,
  ) {}

  async ejecutar(id: number): Promise<void> {
    await this.productosRepository.desactivar(id);
  }
}
