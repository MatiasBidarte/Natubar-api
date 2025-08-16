import { Module } from '@nestjs/common';
import { ProductosService } from './productos.service';
import { ProductosController } from './productos.controller';
import { ObtenerProductos } from '../dominio/casosDeUso/ObtenerProductos';
import { ApiRestProductosRepository } from './ApiRestProductosRepository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Producto } from './entities/producto.entity';
import { Sabor } from 'src/modules/sabores/infraestructura/entities/sabor.entity';
import { ObtenerProductosParaAdministrador } from '../dominio/casosDeUso/ObtenerProductosParaAdmin';
import { CrearProducto } from '../dominio/casosDeUso/CrearProducto';
import { ActualizarProducto } from '../dominio/casosDeUso/ActualizarProducto';
import { DesactivarProducto } from '../dominio/casosDeUso/DesactivarProducto';

@Module({
  imports: [TypeOrmModule.forFeature([Producto, Sabor])],
  controllers: [ProductosController],
  providers: [
    ProductosService,
    ApiRestProductosRepository,
    ObtenerProductos,
    ObtenerProductosParaAdministrador,
    CrearProducto,
    ActualizarProducto,
    DesactivarProducto,
  ],
  exports: [ProductosService, ApiRestProductosRepository, ObtenerProductos],
})
export class ProductosModule {}
