import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientePersona } from 'src/modules/cliente/infraestructura/entities/cliente-persona.entity';
import { ClienteEmpresa } from 'src/modules/cliente/infraestructura/entities/cliente-empresa.entity';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(cliente: Cliente) {
    try {
      if (cliente instanceof ClientePersona) {
        return await this.clienteRepository.save(cliente);
      }
      if (cliente instanceof ClienteEmpresa) {
        return await this.clienteRepository.save(cliente);
      }
    } catch (error) {
      console.error('Error al crear cliente:', error);
      throw error;
    }
  }

  async update(cliente: Cliente) {
    try {
      return await this.clienteRepository.save(cliente);
    } catch (error) {
      console.error('Error al actualizar cliente:', error);
      throw error;
    }
  }

  async findAll() {
    return await this.clienteRepository.find();
  }

  async findByEmail(email: string): Promise<boolean> {
    const usuario = await this.clienteRepository.findOneBy({ email });
    return !!usuario;
  }

  async findById(id: number): Promise<Cliente | null> {
    return await this.clienteRepository.findOne({
      where: { id: id },
    });
  }

  async findOne(email: string): Promise<Cliente | null> {
    const usuario = await this.clienteRepository.findOne({
      where: { email: email },
    });
    return usuario;
  }

  async pedidoPorCliente(id: number) {
    const cliente = await this.clienteRepository.findOne({
      where: { id: id },
      relations: [
        'pedidos',
        'pedidos.detallesPedidos',
        'pedidos.detallesPedidos.productoSabores.sabor',
      ],
    });
    return cliente ? cliente.pedidos : [];
  }
}
