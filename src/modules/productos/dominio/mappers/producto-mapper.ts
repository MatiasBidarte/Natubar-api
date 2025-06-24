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
    );
  }
  static toDomain(raw: ProductoDto): Producto {
    const producto = new Producto(
      raw.id,
      raw.nombre,
      raw.descripcion,
      raw.precioPersonas,
      raw.precioEmpresas,
      raw.stock,
      raw.urlImagen ?? '',
    );
    return producto;
  }

  static toPrimitives(producto: ProductoDto): object {
    return {
      id: producto.id,
      nombre: producto.nombre,
      descripcion: producto.descripcion,
      precioPersonas: producto.precioPersonas,
      precioEmpresas: producto.precioEmpresas,
      stock: producto.stock,
    };
  }
}
