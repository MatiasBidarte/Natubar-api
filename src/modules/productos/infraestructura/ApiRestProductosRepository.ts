import { Injectable } from '@nestjs/common';
import { ProductoDto } from '../dominio/dto/producto.dto';
import { ProductosRepository } from '../dominio/interfaces/ProductosRepository';
import { ProductosService } from './productos.service';

@Injectable()
export class ApiRestProductosRepository implements ProductosRepository {
  constructor(private readonly service: ProductosService) {}

  async obtenerTodos(): Promise<ProductoDto[]> {
    const rawProductos = await this.service.obtener();
    return rawProductos.map(
      (producto) =>
        new ProductoDto(
          producto.id,
          producto.nombre,
          producto.descripcion,
          producto.precioPersonas,
          producto.precioEmpresas,
          producto.stock,
          producto.esCajaDeBarras,
          producto.costoProduccion,
          producto.urlImagen,
          producto.peso,
          producto.cantidadDeBarras,
        ),
    );
  }
}
