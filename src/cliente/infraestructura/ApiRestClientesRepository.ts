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

  async alta(cliente: Cliente): Promise<Cliente> {
    try {
      const clienteModel = this.context.cliente as {
        create: (args: { data: Cliente }) => Promise<Cliente>;
      };
      const createdCliente = await clienteModel.create({
        data: cliente,
      });
      console.log('Cliente creado:', createdCliente);
      return createdCliente;
    } catch (error: unknown) {
      if (error instanceof Error) {
        throw new Error(`Error al crear el cliente: ${error.message}`);
      } else {
        throw new Error('Error desconocido al crear el cliente.');
      }
    }
  }
}
