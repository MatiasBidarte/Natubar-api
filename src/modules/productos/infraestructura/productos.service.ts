import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductosService {
  constructor(
    @InjectRepository(Producto)
    private readonly productoRepository: Repository<Producto>,
  ) {}
  obtener(): Promise<Producto[]> {
    return this.productoRepository.find();
  }
  async findById(id: number): Promise<Producto | null> {
    return await this.productoRepository.findOne({
      where: { id: id },
    });
  }
}
