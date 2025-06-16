import { Injectable } from '@nestjs/common';
import { SaboresRepository } from '../dominio/interfaces/SaboresRepository';
import { SaborDto } from '../dominio/dto/sabor.dto';
import { SaboresService } from './sabores.service';

@Injectable()
export class ApiRestSaboresRepository implements SaboresRepository {
  constructor(private readonly service: SaboresService) {}

  async obtenerTodos(): Promise<SaborDto[]> {
    const rawProductos = await this.service.obtener();
    return rawProductos.map((sabor) => new SaborDto(sabor.id, sabor.nombre));
  }
}
