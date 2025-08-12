import { Cliente } from '../../infraestructura/entities/cliente.entity';
import { ClienteRepository } from '../Interfaces/repositorio/ClienteRepository';
import { forwardRef, Inject } from '@nestjs/common';
import { ApiRestClientesRepository } from 'src/modules/cliente/infraestructura/ApiRestClientesRepository';
import { ClienteDto } from 'src/modules/cliente/dominio/dto/cliente.dto';
export class ObtenerTodosCliente {
  constructor(
    @Inject(forwardRef(() => ApiRestClientesRepository))
    private readonly clienteRepository: ClienteRepository,
  ) {}

  async ejecutar(): Promise<Cliente[] | ClienteDto[]> {
    return await this.clienteRepository.obtenerTodos();
  }
}
