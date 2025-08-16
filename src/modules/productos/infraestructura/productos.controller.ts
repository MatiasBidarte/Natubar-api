/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Controller,
  Get,
  InternalServerErrorException,
  Post,
  Body,
  Put,
  Param,
  Patch,
  HttpCode,
  ParseIntPipe,
} from '@nestjs/common';

import { ObtenerProductos } from '../dominio/casosDeUso/ObtenerProductos';
import { ObtenerProductosParaAdministrador } from '../dominio/casosDeUso/ObtenerProductosParaAdmin';
import { CrearProducto } from '../dominio/casosDeUso/CrearProducto';
import { ActualizarProducto } from '../dominio/casosDeUso/ActualizarProducto';
import { DesactivarProducto } from '../dominio/casosDeUso/DesactivarProducto';
import { CrearActualizarProductoDto } from '../dominio/dto/crearActualizarProductoDto';

@Controller('productos')
export class ProductosController {
  constructor(
    private readonly obtenerProductos: ObtenerProductos,
    private readonly obtenerProductosParaAdmin: ObtenerProductosParaAdministrador,
    private readonly crearProducto: CrearProducto,
    private readonly actualizarProducto: ActualizarProducto,
    private readonly desactivarProducto: DesactivarProducto,
  ) {}

  @Get()
  async findAll() {
    try {
      return await this.obtenerProductos.ejecutar();
    } catch (e) {
      throw new InternalServerErrorException('Error al obtener los productos');
    }
  }

  @Get('administrador')
  async findAllForAdmin() {
    try {
      return await this.obtenerProductosParaAdmin.ejecutar();
    } catch (e) {
      throw new InternalServerErrorException(
        'Error al obtener los productos para el administrador',
      );
    }
  }

  @Post()
  async create(@Body() productoDto: CrearActualizarProductoDto) {
    return await this.crearProducto.ejecutar(productoDto);
  }

  @Put(':id')
  async update(
    @Param('id', ParseIntPipe) id: number,
    @Body() productoDto: CrearActualizarProductoDto,
  ) {
    return await this.actualizarProducto.ejecutar(id, productoDto);
  }

  @Patch(':id/desactivar')
  @HttpCode(204)
  async desactivar(@Param('id', ParseIntPipe) id: number) {
    await this.desactivarProducto.ejecutar(id);
  }
}
