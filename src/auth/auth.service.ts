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
    const payload = { ...userWithoutPassword };
    const token = this.jwtService.sign(payload);
    return {
      access_token: token,
    };
  }
}
