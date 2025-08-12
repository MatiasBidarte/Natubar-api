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
import { DetallePedido } from './entities/detalle-pedido.entity';
import { ProductoSabor } from 'src/modules/productos/infraestructura/entities/producto-sabor.entity';
import { ObtenerPedidos } from '../dominio/casosDeUso/ObtenerPedidos';
import { ChangeEstadoPago } from '../dominio/casosDeUso/ChangeEstadoPago';
import { NotificacionModule } from 'src/modules/notificacion/infraestructura/notificacion.module';
import { RecordarPago } from '../dominio/casosDeUso/RecordarPago';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Pedido,
      Producto,
      Cliente,
      DetallePedido,
      ProductoSabor,
    ]),
    forwardRef(() => AuthModule),
    forwardRef(() => NotificacionModule),
    ClienteModule,
    ProductosModule,
    PedidosModule,
    SaboresModule,
    NotificacionModule,
  ],
  controllers: [PedidosController],
  providers: [
    PedidosService,
    ApiRestPedidosRepository,
    CrearPedido,
    ConfirmarPedido,
    GetByEstado,
    ChangeEstado,
    ObtenerPedidos,
    ChangeEstadoPago,
    RecordarPago,
  ],
  exports: [
    PedidosService,
    ApiRestPedidosRepository,
    CrearPedido,
    ConfirmarPedido,
    GetByEstado,
    ChangeEstado,
    ChangeEstadoPago,
    RecordarPago,
  ],
})
export class PedidosModule {}
