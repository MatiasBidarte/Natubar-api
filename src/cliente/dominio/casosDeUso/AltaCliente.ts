import { ClienteRepository } from '../Interfaces/repositorio/ClienteRepository';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { IAlta } from '../Interfaces/genericas/IAlta';
import { Cliente } from 'src/cliente/infraestructura/entities/cliente.entity';
import { ApiRestClientesRepository } from 'src/cliente/infraestructura/ApiRestClientesRepository';
@Injectable()
export class AltaCliente implements IAlta<Cliente> {
  constructor(
    @Inject(forwardRef(() => ApiRestClientesRepository))
    private readonly clienteRepository: ClienteRepository,
  ) {}

  async ejecutar(dto: Cliente): Promise<Cliente> {
    return await this.clienteRepository.alta(dto); // Make sure clienteRepository is not undefined
  }
}
