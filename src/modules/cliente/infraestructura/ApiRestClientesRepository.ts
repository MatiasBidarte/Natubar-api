import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClienteRepository } from '../dominio/Interfaces/repositorio/ClienteRepository';
import { ClienteService } from './cliente.service';
import { Cliente } from './entities/cliente.entity';
import { AuthService } from 'src/auth/auth.service';
import { CrearClienteResponseDto } from '../dominio/dto/crear-cliente.dto';

@Injectable()
export class ApiRestClientesRepository implements ClienteRepository {
  constructor(
    private readonly context: ClienteService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  obtenerTodos(): Cliente[] | PromiseLike<Cliente[]> {
    return this.context.findAll();
  }

  async alta(cliente: Cliente): Promise<CrearClienteResponseDto> {
    try {
      if (await this.context.findByEmail(cliente.email)) {
        throw new HttpException('El correo ya está en uso.', 409);
      }
      await this.context.create(cliente);
      const token = await this.authService.signIn(
        cliente.email,
        cliente.contrasena,
      );
      return { access_token: token.access_token };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        console.log(error);
        throw new InternalServerErrorException(
          'Error desconocido al crear el cliente.',
        );
      }
    }
  }
}
