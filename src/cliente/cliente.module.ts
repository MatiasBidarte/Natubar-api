import { Module } from '@nestjs/common';
import { ClienteController } from './cliente.controller';
import { ClienteService } from './cliente.service';
import { ClienteInterface } from './cliente.interface';
import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from './entities/cliente.entity';
import { ClientePersona } from 'src/cliente-persona/entities/cliente-persona.entity';
import { ClienteEmpresa } from 'src/cliente-empresa/entities/cliente-empresa.entity';
import { LoginCliente } from './casosDeUso/login';

@Module({
  imports: [TypeOrmModule.forFeature([Cliente])], // Asegura que tenga la entidad correcta
  controllers: [ClienteController], // Aquí se registra el controlador
  providers: [ClienteService,LoginCliente], // AÑADIR CASOS DE USO
  exports: [ClienteService], // Exporta el servicio si otros módulos lo necesitan
})

export class ClienteModule {


}
