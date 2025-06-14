import { forwardRef, Inject } from '@nestjs/common';
import { ApiRestSaboresRepository } from 'src/sabores/infraestructura/ApiRestSaboresRepository';
import { SaborDto } from '../dto/sabor.dto';
import { SaboresRepository } from '../interfaces/SaboresRepository';

export class ObtenerSabores {
  constructor(
    @Inject(forwardRef(() => ApiRestSaboresRepository))
    private readonly saboresRepository: SaboresRepository,
  ) {}

  async ejecutar(): Promise<SaborDto[]> {
    return await this.saboresRepository.obtenerTodos();
  }
}
