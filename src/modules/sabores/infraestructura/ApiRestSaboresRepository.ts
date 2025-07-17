import { Injectable } from '@nestjs/common';
import { SaboresRepository } from '../dominio/interfaces/SaboresRepository';
import { SaboresService } from './sabores.service';
import { Sabor } from './entities/sabor.entity';

@Injectable()
export class ApiRestSaboresRepository implements SaboresRepository {
  constructor(private readonly service: SaboresService) {}

  async obtenerTodos(): Promise<Sabor[]> {
    const rawProductos = await this.service.obtener();
    return rawProductos.map((sabor) => new Sabor(sabor.id, sabor.nombre));
  }
}
