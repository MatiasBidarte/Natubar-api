import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ClienteService } from '../modules/cliente/infraestructura/cliente.service';
import { JwtService } from '@nestjs/jwt';

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
    const payload = { mail: user.email, id: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
