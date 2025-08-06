import { forwardRef, Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { ClienteService } from './cliente.service';
import { AltaCliente } from '../dominio/casosDeUso/AltaCliente';
import { LoginCliente } from '../dominio/casosDeUso/Login';
import { ObtenerTodosCliente } from '../dominio/casosDeUso/ObtenerTodosCliente';
import { ApiRestClientesRepository } from './ApiRestClientesRepository';
import { AuthModule } from 'src/auth/auth.module';
import { ActualizarCliente } from '../dominio/casosDeUso/ActualizarCliente';
import { PedidosDeCliente } from '../dominio/casosDeUso/PedidosDeCliente';
import { ObtenerClientePorId } from '../dominio/casosDeUso/ObtenerClientePorId';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente]), forwardRef(() => AuthModule)],
  controllers: [ClienteController],
  providers: [
    ClienteService,
    ApiRestClientesRepository,
    LoginCliente,
    AltaCliente,
    ObtenerTodosCliente,
    ActualizarCliente,
    PedidosDeCliente,
    ObtenerClientePorId,
  ],
  exports: [
    ClienteService,
    ApiRestClientesRepository,
    AltaCliente,
    LoginCliente,
    ObtenerTodosCliente,
    ActualizarCliente,
    PedidosDeCliente,
    ObtenerClientePorId,
  ],
})
export class ClienteModule {}
