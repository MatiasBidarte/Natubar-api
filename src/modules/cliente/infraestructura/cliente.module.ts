import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { ClienteService } from './cliente.service';
import { AltaCliente } from '../dominio/casosDeUso/AltaCliente';
import { LoginCliente } from '../dominio/casosDeUso/Login';
import { ObtenerTodosCliente } from '../dominio/casosDeUso/ObtenerTodosCliente';
import { ApiRestClientesRepository } from './ApiRestClientesRepository';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])],
  controllers: [ClienteController],
  providers: [
    ClienteService,
    ApiRestClientesRepository,
    LoginCliente,
    AltaCliente,
    ObtenerTodosCliente,
    JwtService,
    AuthService
  ],
  exports: [
    ClienteService,
    ApiRestClientesRepository,
    AltaCliente,
    LoginCliente,
    ObtenerTodosCliente,
  ],
})
export class ClienteModule {}
