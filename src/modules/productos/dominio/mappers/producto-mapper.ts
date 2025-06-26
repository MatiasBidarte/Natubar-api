import { Producto } from '../../infraestructura/entities/producto.entity';
import { ProductoDto } from '../dto/producto.dto';

export class ProductoMapper {
  static toDto(producto: Producto): ProductoDto {
    return new ProductoDto(
      producto.id,
      producto.nombre,
      producto.descripcion,
      producto.precioPersonas,
      producto.precioEmpresas,
      producto.stock,
      producto.esCajaDeBarras,
      producto.cantidadDeBarras,
    );
  }

  static toPrimitives(producto: ProductoDto): object {
    return {
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precioPersonas: producto.precioPersonas,
      precioEmpresas: producto.precioEmpresas,
      stock: producto.stock,
      esCajaDeBarras: producto.esCajaDeBarras,
      cantidadDeBarras: producto.cantidadDeBarras,
    };
  }
}
