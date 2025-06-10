import {
  HttpException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { ClienteRepository } from '../dominio/Interfaces/repositorio/ClienteRepository';
import { ClienteService } from './cliente.service';
import { Cliente } from './entities/cliente.entity';

@Injectable()
export class ApiRestClientesRepository implements ClienteRepository {
  constructor(private readonly context: ClienteService) {}
  
  obtenerTodos(): Cliente[] | PromiseLike<Cliente[]> {
    return this.context.findAll();
  }

  async alta(cliente: Cliente) {
    try {
      
      if (await this.context.findByEmail(cliente.email)) {
        throw new HttpException('El correo ya está en uso.', 409);
      }
      await this.context.create(cliente);
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        throw new InternalServerErrorException(
          'Error desconocido al crear el cliente.',
        );
      }
    }
  }
}
