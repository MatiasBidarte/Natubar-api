import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidosController } from './pedidos.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PedidosService } from './pedidos.service';
import { ApiRestPedidosRepository } from './ApiRestPedidosRepository';
import { CrearPedido } from '../dominio/casosDeUso/CrearPedido';
import { Producto } from 'src/modules/productos/infraestructura/entities/producto.entity';
import { Cliente } from 'src/modules/cliente/infraestructura/entities/cliente.entity';
import { ClienteModule } from 'src/modules/cliente/infraestructura/cliente.module';
import { ProductosModule } from 'src/modules/productos/infraestructura/productos.module';
import { ConfirmarPedido } from '../dominio/casosDeUso/ConfirmarPedido';
import { GetByEstado } from '../dominio/casosDeUso/GetByEstado';
import { SaboresModule } from 'src/modules/sabores/infraestructura/sabores.module';
import { ChangeEstado } from '../dominio/casosDeUso/ChangeEstado';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Producto, Cliente]),
    forwardRef(() => AuthModule),
    ClienteModule,
    ProductosModule,
    PedidosModule,
    SaboresModule,
  ],
  controllers: [PedidosController],
  providers: [
    PedidosService,
    ApiRestPedidosRepository,
    CrearPedido,
    ConfirmarPedido,
    GetByEstado,
    ChangeEstado,
  ],
  exports: [
    PedidosService,
    ApiRestPedidosRepository,
    CrearPedido,
    ConfirmarPedido,
    GetByEstado,
    ChangeEstado,
  ],
})
export class PedidosModule {}
