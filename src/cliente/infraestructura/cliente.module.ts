import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { ClienteService } from './cliente.service';
import { AltaCliente } from '../dominio/casosDeUso/AltaCliente';
import { ObtenerTodosCliente } from '../dominio/casosDeUso/ObtenerTodosCliente';
import { ApiRestClientesRepository } from './ApiRestClientesRepository';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClienteController],
  providers: [
    ClienteService,
    ApiRestClientesRepository,
    AltaCliente,
    ObtenerTodosCliente,
  ],
  exports: [
    ClienteService,
    ApiRestClientesRepository,
    AltaCliente,
    ObtenerTodosCliente,
  ],
})
export class ClienteModule {}
