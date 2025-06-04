import { ClienteRepository } from '../Interfaces/repositorio/ClienteRepository';
import { Inject, Injectable } from '@nestjs/common';
import { IAlta } from '../Interfaces/genericas/IAlta';
import { Cliente } from 'src/cliente/infraestructura/entities/cliente.entity';
@Injectable()
export class AltaCliente implements IAlta<Cliente> {
  constructor(
    @Inject('ClienteRepository') // use the provider token as a string
    private readonly clienteRepository: ClienteRepository,
  ) {}

  async ejecutar(dto: Cliente): Promise<Cliente> {
    return this.clienteRepository.alta(dto); // Make sure clienteRepository is not undefined
  }
}
