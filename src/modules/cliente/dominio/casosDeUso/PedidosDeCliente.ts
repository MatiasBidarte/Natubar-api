import { forwardRef, Inject } from '@nestjs/common';
import { ApiRestClientesRepository } from '../../infraestructura/ApiRestClientesRepository';
import { ClienteRepository } from '../Interfaces/repositorio/ClienteRepository';

export class PedidosDeCliente {
  constructor(
    @Inject(forwardRef(() => ApiRestClientesRepository))
    private readonly clienteRepository: ClienteRepository,
  ) {}

  async ejecutar(id: number) {
    return await this.clienteRepository.pedidosPorCliente(id);
  }
}
