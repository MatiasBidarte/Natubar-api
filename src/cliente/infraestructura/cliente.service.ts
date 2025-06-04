import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientePersona } from 'src/cliente-persona/entities/cliente-persona.entity';
import { ClienteEmpresa } from 'src/cliente-empresa/entities/cliente-empresa.entity';
import { plainToClass } from 'class-transformer';
@Injectable()
export class ClienteService {
  cliente: any;
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(cliente: Cliente) {
    if (
      cliente instanceof ClientePersona &&
      !(cliente instanceof ClienteEmpresa)
    ) {
      const clienteP = plainToClass(ClientePersona, cliente);
      const nuevoCliente = this.clienteRepository.create(clienteP);
      return await this.clienteRepository.save(nuevoCliente);
    }

    if (
      cliente instanceof ClienteEmpresa &&
      !(cliente instanceof ClientePersona)
    ) {
      const clienteE = plainToClass(ClienteEmpresa, cliente);
      const nuevoCliente = this.clienteRepository.create(clienteE);
      return await this.clienteRepository.save(nuevoCliente);
    }
  }

  async findAll() {
    return await this.clienteRepository.find();
  }

  async findByEmail(email: string): Promise<boolean> {
    const usuario = await this.clienteRepository.findOneBy({ email });
    return !!usuario;
  }
}
