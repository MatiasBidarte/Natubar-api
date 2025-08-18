import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { ProductoDto } from '../dominio/dto/producto.dto';
import { ProductosRepository } from '../dominio/interfaces/ProductosRepository';
import { ProductosService } from './productos.service';
import { CrearActualizarProductoDto } from '../dominio/dto/crearActualizarProductoDto';

@Injectable()
export class ApiRestProductosRepository implements ProductosRepository {
  constructor(private readonly service: ProductosService) {}

  async obtenerTodosParaAdministrador(): Promise<ProductoDto[]> {
    const productos = await this.service.obtenerParaAdministrador();
    return productos.map(
      (producto) =>
        new ProductoDto(
          producto.id,
          producto.nombre,
          producto.descripcion,
          producto.precioPersonas,
          producto.precioEmpresas,
          producto.esCajaDeBarras,
          producto.costoProduccion,
          producto.urlImagen,
          producto.cantidadDeBarras,
          producto.estaActivo,
        ),
    );
  }

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
          producto.esCajaDeBarras,
          producto.costoProduccion,
          producto.urlImagen,
          producto.cantidadDeBarras,
          producto.estaActivo,
        ),
    );
  }

  async crear(productoDto: CrearActualizarProductoDto): Promise<ProductoDto> {
    try {
      const nuevoProducto = await this.service.crear(productoDto);
      return new ProductoDto(
        nuevoProducto.id,
        nuevoProducto.nombre,
        nuevoProducto.descripcion,
        nuevoProducto.precioPersonas,
        nuevoProducto.precioEmpresas,
        nuevoProducto.esCajaDeBarras,
        nuevoProducto.costoProduccion,
        nuevoProducto.urlImagen,
        nuevoProducto.cantidadDeBarras,
        nuevoProducto.estaActivo,
      );
    } catch (error) {
      throw new BadRequestException(`Error al crear producto: ${error}`);
    }
  }

  async actualizar(
    id: number,
    productoDto: CrearActualizarProductoDto,
  ): Promise<ProductoDto> {
    try {
      const productoExistente = await this.service.obtenerPorId(id);
      if (!productoExistente) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }

      const productoActualizado = await this.service.actualizar(
        id,
        productoDto,
      );
      return new ProductoDto(
        productoActualizado!.id,
        productoActualizado!.nombre,
        productoActualizado!.descripcion,
        productoActualizado!.precioPersonas,
        productoActualizado!.precioEmpresas,
        productoActualizado!.esCajaDeBarras,
        productoActualizado!.costoProduccion,
        productoActualizado!.urlImagen,
        productoActualizado!.cantidadDeBarras,
        productoActualizado!.estaActivo,
      );
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al actualizar producto: ${error}`);
    }
  }

  async desactivar(id: number): Promise<void> {
    try {
      const productoExistente = await this.service.obtenerPorId(id);
      if (!productoExistente) {
        throw new NotFoundException(`Producto con ID ${id} no encontrado`);
      }

      await this.service.desactivar(id);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Error al desactivar producto: ${error}`);
    }
  }
}
