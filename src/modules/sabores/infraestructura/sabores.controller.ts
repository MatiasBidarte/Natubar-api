import { Controller, Get, InternalServerErrorException } from '@nestjs/common';
import { ObtenerSabores } from '../dominio/casosDeUso/ObtenerSabores';

@Controller('sabores')
export class SaboresController {
  constructor(private readonly obtener: ObtenerSabores) {}

  @Get()
  findAll() {
    try {
      return this.obtener.ejecutar();
    } catch {
      throw new InternalServerErrorException('Error al obtener los productos');
    }
  }
}
