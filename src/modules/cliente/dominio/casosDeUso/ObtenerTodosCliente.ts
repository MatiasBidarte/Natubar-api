import { Cliente } from '../../infraestructura/entities/cliente.entity';
import { ClienteRepository } from '../Interfaces/repositorio/ClienteRepository';
import { forwardRef, Inject } from '@nestjs/common';
import { ApiRestClientesRepository } from 'src/modules/cliente/infraestructura/ApiRestClientesRepository';
export class ObtenerTodosCliente {
  constructor(
    @Inject(forwardRef(() => ApiRestClientesRepository))
    private readonly clienteRepository: ClienteRepository,
  ) {}

  async ejecutar(): Promise<Cliente[]> {
    return await this.clienteRepository.obtenerTodos();
  }
}
