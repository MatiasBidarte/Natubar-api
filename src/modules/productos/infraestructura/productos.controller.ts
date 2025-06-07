/* eslint-disable @typescript-eslint/no-unused-vars */
import { Controller, Get, InternalServerErrorException } from '@nestjs/common';

import { ObtenerProductos } from '../dominio/casosDeUso/ObtenerProductos';

@Controller('productos')
export class ProductosController {
  constructor(private readonly obtenerProductos: ObtenerProductos) {}

  @Get()
  findAll() {
    try {
      return this.obtenerProductos.ejecutar();
    } catch (e) {
      throw new InternalServerErrorException('Error al obtener los productos');
    }
  }
}
