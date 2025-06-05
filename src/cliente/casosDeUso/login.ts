import { Inject, Injectable } from '@nestjs/common';
import { LoginClienteDto } from '../dto/login-cliente.dto';
import { ClienteService } from '../cliente.service';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginCliente {
  constructor(private readonly clienteService: ClienteService) {}

  async ejecutar(clienteLoginDto: LoginClienteDto) {
    const cliente = await this.clienteService.findOne(clienteLoginDto.email);
    if (cliente == null) {
      throw new BadRequestException('Usuario no encontrado');
    }

    const esContrasenaValida = await bcrypt.compare(
      clienteLoginDto.contrasena,
      cliente.contrasena,
    );

    if (!esContrasenaValida) {
      throw new BadRequestException('Contraseña incorrecta');
    } else {
      //HACER EL TOKEN
      return 'yippee';
    }
  }
}
