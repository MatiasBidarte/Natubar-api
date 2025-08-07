import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ClienteRepository } from '../Interfaces/repositorio/ClienteRepository';
import { ApiRestClientesRepository } from '../../infraestructura/ApiRestClientesRepository';
import { Cliente } from '../../infraestructura/entities/cliente.entity';

@Injectable()
export class ObtenerClientePorId {
  constructor(
    @Inject(forwardRef(() => ApiRestClientesRepository))
    private readonly clienteRepository: ClienteRepository,
  ) {}

  async ejecutar(id: number): Promise<Cliente | null> {
    return await this.clienteRepository.obtenerPorId(id);
  }
}
