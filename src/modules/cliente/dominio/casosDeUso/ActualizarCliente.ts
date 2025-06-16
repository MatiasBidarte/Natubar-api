// src/modules/cliente/dominio/casosDeUso/ActualizarCliente.ts
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ClienteRepository } from '../Interfaces/repositorio/ClienteRepository';
import { ApiRestClientesRepository } from 'src/modules/cliente/infraestructura/ApiRestClientesRepository';
import { ActualizarClienteDto } from '../dto/actualizar-cliente.dto';
import { Cliente } from '../../infraestructura/entities/cliente.entity';

@Injectable()
export class ActualizarCliente {
  constructor(
    @Inject(forwardRef(() => ApiRestClientesRepository))
    private readonly clienteRepository: ClienteRepository,
  ) {}

  async ejecutar(
    id: number,
    clienteDto: ActualizarClienteDto,
  ): Promise<{ cliente: Partial<Cliente>; access_token: string }> {
    return await this.clienteRepository.actualizar(id, clienteDto);
  }
}
