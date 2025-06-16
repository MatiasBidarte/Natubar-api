import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { In, Repository } from 'typeorm';
import { ProductoDto } from '../dominio/dto/producto.dto';
import { Sabor } from 'src/modules/sabores/infraestructura/entities/sabore.entity';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
    @InjectRepository(Sabor)
    private readonly saborRepository: Repository<Sabor>,
  ) {}

  async alta(dto: ProductoDto): Promise<Producto> {
    const sabores = await this.saborRepository.find({
      where: { id: In(dto.sabores) },
    });
    const producto = this.productoRepository.create({
      nombre: dto.nombre,
      sabores,
    });
    return this.productoRepository.save(producto);
  }
  obtener(): Promise<Producto[]> {
    return this.productoRepository.find({ relations: ['sabores'] });
  }
}
