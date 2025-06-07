import { Cliente } from '../../infraestructura/entities/cliente.entity';
import { ClienteRepository } from '../Interfaces/repositorio/ClienteRepository';
import { IObtenerTodsos } from '../Interfaces/genericas/IObtenerTodos';
import { forwardRef, Inject } from '@nestjs/common';
import { ApiRestClientesRepository } from 'src/cliente/infraestructura/ApiRestClientesRepository';
export class ObtenerTodosCliente implements IObtenerTodsos<Cliente[]> {
  constructor(
    @Inject(forwardRef(() => ApiRestClientesRepository))
    private readonly clienteRepository: ClienteRepository,
  ) {}

  async ejecutar(): Promise<Cliente[]> {
    return await this.clienteRepository.obtenerTodos();
  }
}
