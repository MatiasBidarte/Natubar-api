import {
  Controller,
  Get,
  Post,
  Body,
  InternalServerErrorException,
} from '@nestjs/common';
import { ObtenerSabores } from '../dominio/casosDeUso/ObtenerSabores';
import { AltaSabor } from '../dominio/casosDeUso/AltaSabor';
import { SaborDto } from '../dominio/dto/sabor.dto';

@Controller('sabores')
export class SaboresController {
  constructor(
    private readonly obtener: ObtenerSabores,
    private readonly alta: AltaSabor,
  ) {}

  @Get()
  findAll() {
    try {
      return this.obtener.ejecutar();
    } catch {
      throw new InternalServerErrorException('Error al obtener los productos');
    }
  }
  @Post()
  create(@Body() createSaboreDto: SaborDto) {
    const sabor = {
      ...createSaboreDto,
      productos: [],
    };
    return this.alta.ejecutar(sabor);
  }
}
