import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';
import { CrearActualizarProductoDto } from '../dominio/dto/crearActualizarProductoDto';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}

  obtener(): Promise<Producto[]> {
    return this.productoRepository
      .createQueryBuilder('producto')
      .where('producto.estaActivo = :estaActivo', { estaActivo: true })
      .orderBy('producto.esCajaDeBarras', 'DESC')
      .addOrderBy(
        `CASE WHEN LOWER(producto.nombre) LIKE '%barras%' THEN 0 ELSE 1 END`,
        'ASC',
      )
      .addOrderBy('producto.nombre', 'ASC')
      .getMany();
  }

  async findById(id: number): Promise<Producto | null> {
    return await this.productoRepository.findOne({
      where: { id: id },
    });
  }

  async obtenerParaAdministrador(): Promise<Producto[]> {
    return await this.productoRepository.find({
      order: {
        esCajaDeBarras: 'DESC',
      },
    });
  }

  async obtenerPorId(id: number) {
    return await this.productoRepository.findOne({
      where: { id },
    });
  }

  async crear(productoDto: CrearActualizarProductoDto) {
    const nuevoProducto = this.productoRepository.create({
      nombre: productoDto.nombre,
      descripcion: productoDto.descripcion,
      precioPersonas: productoDto.precioPersonas,
      precioEmpresas: productoDto.precioEmpresas,
      esCajaDeBarras: productoDto.esCajaDeBarras,
      costoProduccion: productoDto.costoProduccion,
      urlImagen: productoDto.urlImagen,
      cantidadDeBarras: productoDto.cantidadDeBarras || 0,
      estaActivo: productoDto.estaActivo !== false,
    });

    return await this.productoRepository.save(nuevoProducto);
  }

  async actualizar(id: number, productoDto: CrearActualizarProductoDto) {
    await this.productoRepository.update(id, {
      nombre: productoDto.nombre,
      descripcion: productoDto.descripcion,
      precioPersonas: productoDto.precioPersonas,
      precioEmpresas: productoDto.precioEmpresas,
      esCajaDeBarras: productoDto.esCajaDeBarras,
      costoProduccion: productoDto.costoProduccion,
      urlImagen: productoDto.urlImagen,
      cantidadDeBarras: productoDto.cantidadDeBarras,
      estaActivo: productoDto.estaActivo,
    });

    return await this.obtenerPorId(id);
  }

  async desactivar(id: number): Promise<void> {
    await this.productoRepository.update(id, { estaActivo: false });
  }
}
