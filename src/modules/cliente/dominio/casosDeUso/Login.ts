import { Injectable } from '@nestjs/common';
import { LoginClienteDto } from '../dto/login-cliente.dto';
import { ClienteService } from 'src/modules/cliente/infraestructura/cliente.service';
import {
  BadRequestException,
  Body,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from 'src/auth/auth.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class LoginCliente {
  constructor(
    private readonly clienteService: ClienteService,
    private jwtService: AuthService,
  ) {}

  async ejecutar(clienteLoginDto: LoginClienteDto) {
    const cliente = await this.clienteService.findOne(clienteLoginDto.email);
    if (cliente == null) {
      throw new BadRequestException('Usuario no encontrado');
    }

    if (cliente.tipo !== 'Administrador') {
      const esContrasenaValida = await bcrypt.compare(
        clienteLoginDto.contrasena,
        cliente.contrasena,
      );
      if (!esContrasenaValida) {
        throw new UnauthorizedException('Contraseña incorrecta');
      }
    }
    return await this.jwtService.signIn(cliente.email, cliente.contrasena);
  }
}
