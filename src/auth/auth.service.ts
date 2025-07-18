/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  forwardRef,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { ClienteService } from '../modules/cliente/infraestructura/cliente.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { Cliente } from '../modules/cliente/infraestructura/entities/cliente.entity';
//import { jwtConstants } from './constants';
import { LoginRetornoClienteDto } from 'src/modules/cliente/dominio/dto/login-retorno-cliente-dto';

import { ClientePersona } from 'src/modules/cliente/infraestructura/entities/cliente-persona.entity';
import { ClienteEmpresa } from 'src/modules/cliente/infraestructura/entities/cliente-empresa.entity';

@Injectable()
export class AuthService {
  constructor(
    @Inject(forwardRef(() => ClienteService))
    private ClienteService: ClienteService,
    private jwtService: JwtService,
  ) {}

  async signIn(
    email: string,
    contra: string,
  ): Promise<{ access_token: string }> {
    const user = await this.ClienteService.findOne(email);
    if (user == null) {
      throw new UnauthorizedException();
    }
    if (
      contra !== user.contrasena &&
      !(await bcrypt.compare(contra, user.contrasena))
    ) {
      throw new UnauthorizedException('Contraseña incorrecta');
    }
    const { contrasena, ...userWithoutPassword } = user;
    const payload = {
      ...userWithoutPassword,
      tipo: user instanceof ClientePersona ? 'PERSONA' : 'EMPRESA',
    };
    console.log(user instanceof ClientePersona ? 'PERSONA' : 'EMPRESA');
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }

  // Nuevo método para generar token sin verificar contraseña
  generateTokenForUser(cliente: Partial<Cliente>): { access_token: string } {
    const { contrasena, ...userWithoutPassword } = cliente;
    const payload = {
      ...userWithoutPassword,
      tipo:
        cliente instanceof ClientePersona
          ? 'PERSONA'
          : ClienteEmpresa
            ? 'EMPRESA'
            : 'ADMINISTRADOR',
    };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }
}
