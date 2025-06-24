import { forwardRef, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Pedido } from './entities/pedido.entity';
import { PedidosController } from './pedidos.controller';
import { AuthModule } from 'src/auth/auth.module';
import { PedidosService } from './pedidos.service';
import { ApiRestPedidosRepository } from './ApiRestPedidosRepository';
import { PagarPedido } from '../dominio/casosDeUso/PagarPedido';
import { Producto } from 'src/modules/productos/infraestructura/entities/producto.entity';
import { Cliente } from 'src/modules/cliente/infraestructura/entities/cliente.entity';
import { ClienteModule } from 'src/modules/cliente/infraestructura/cliente.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Pedido, Producto, Cliente]),
    forwardRef(() => AuthModule),
    ClienteModule,
    PedidosModule,
  ],
  controllers: [PedidosController],
  providers: [PedidosService, ApiRestPedidosRepository, PagarPedido],
  exports: [PedidosService, ApiRestPedidosRepository, PagarPedido],
})
export class PedidosModule {}
