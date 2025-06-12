import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClienteService } from '../modules/cliente/infraestructura/cliente.service';
import { JwtService } from '@nestjs/jwt';
import { jwtConstants } from './constants';
import { LoginRetornoClienteDto } from 'src/modules/cliente/dominio/dto/login-retorno-cliente-dto';

@Injectable()
export class AuthService {
  constructor(
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
    const payload = { sub: user.id, mail: user.email };

    const token = this.jwtService.sign(payload, {
      secret: jwtConstants.secret,
    });
    return new LoginRetornoClienteDto(user,token);
  }
}
