import { ClienteRepository } from '../Interfaces/repositorio/ClienteRepository';
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { Cliente } from 'src/modules/cliente/infraestructura/entities/cliente.entity';
import { ApiRestClientesRepository } from 'src/modules/cliente/infraestructura/ApiRestClientesRepository';
import { CrearClienteResponseDto } from '../dto/crear-cliente.dto';
@Injectable()
export class AltaCliente {
  constructor(
    @Inject(forwardRef(() => ApiRestClientesRepository))
    private readonly clienteRepository: ClienteRepository,
  ) {}

  async ejecutar(dto: Cliente): Promise<CrearClienteResponseDto> {
    return await this.clienteRepository.alta(dto);
  }
}
