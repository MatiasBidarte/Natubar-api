import { Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientePersona } from 'src/modules/cliente/infraestructura/entities/cliente-persona.entity';
import { ClienteEmpresa } from 'src/modules/cliente/infraestructura/entities/cliente-empresa.entity';
import { ClienteAdministrador } from 'src/modules/cliente/infraestructura/entities/cliente-administrador.entity';
import { ClienteDto } from 'src/modules/cliente/dominio/dto/cliente.dto';
import { ClienteMapper } from 'src/modules/cliente/dominio/mapper/UsuarioMapper';

@Injectable()
export class ClienteService {
  constructor(
    @InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>,
  ) {}

  async create(cliente: Cliente) {
    try {
      return await this.clienteRepository.save(cliente);
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

  async findAll(): Promise<ClienteDto[]> {
    const clientes = await this.clienteRepository.find();
    return clientes
      .filter((c) => !(c instanceof ClienteAdministrador))
      .map((c) => ClienteMapper.toDto(c));
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
        'pedidos.productos',
        'pedidos.productos.productoSabores',
        'pedidos.productos.productoSabores.sabor',
      ],
      order: {
        pedidos: {
          fechaCreacion: 'DESC',
        },
      },
    });
    return cliente ? cliente.pedidos : [];
  }
}
