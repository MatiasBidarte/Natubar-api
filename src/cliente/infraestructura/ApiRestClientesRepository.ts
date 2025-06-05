import { Injectable } from '@nestjs/common';
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
      await this.context.create(cliente);
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error al crear el cliente: ${error.message}`);
      } else {
        throw new Error('Error desconocido al crear el cliente.');
      }
    }
  }
}
