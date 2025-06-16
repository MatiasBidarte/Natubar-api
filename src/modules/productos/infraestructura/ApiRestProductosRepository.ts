import { Injectable } from '@nestjs/common';
import { ProductoDto } from '../dominio/dto/producto.dto';
import { ProductosRepository } from '../dominio/interfaces/ProductosRepository';
import { ProductosService } from './productos.service';
import { Sabor } from 'src/modules/sabores/infraestructura/entities/sabore.entity';
import { SaborDto } from 'src/modules/sabores/dominio/dto/sabor.dto';
import { Producto } from './entities/producto.entity';

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
          Array.isArray(producto.sabores)
            ? producto.sabores.map(
                (sabor: Sabor) =>
                  new SaborDto(
                    sabor.id,
                    sabor.nombre,
                    Array.isArray(sabor.productos)
                      ? sabor.productos.map((producto: Producto) => producto.id)
                      : [],
                  ),
              )
            : [],
          producto.urlImagen,
        ),
    );
  }
}
