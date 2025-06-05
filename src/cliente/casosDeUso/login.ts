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

    //no termina de andar
    const contrasena = await bcrypt.hash(clienteLoginDto.contrasena, 10);

    console.log('recibida' + contrasena + '  ; logeada' + cliente.contrasena);

    if (contrasena != cliente.contrasena) {
      throw new BadRequestException('Contraseña incorrecta');
    }

    //HACER EL TOKEN
    return 'yippee';
  }
}
