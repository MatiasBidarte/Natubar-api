import { Cliente } from '../../infraestructura/entities/cliente.entity';
import { ClienteRepository } from '../Interfaces/repositorio/ClienteRepository';
import { IObtenerTodsos } from '../Interfaces/genericas/IObtenerTodos';
export class ObtenerTodosCliente implements IObtenerTodsos<Cliente[]> {
  constructor(private readonly clienteRepository: ClienteRepository) {}

  async ejecutar(): Promise<Cliente[]> {
    return await this.clienteRepository.obtenerTodos();
  }
}
