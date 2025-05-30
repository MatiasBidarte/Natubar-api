import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/crear-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { find } from 'rxjs';
import { ClientePersona } from 'src/cliente-persona/entities/cliente-persona.entity';
import { ClienteEmpresa } from 'src/cliente-empresa/entities/cliente-empresa.entity';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,
        @InjectRepository(ClientePersona)
        private readonly clientePersonaRepository: Repository<ClientePersona>,
        @InjectRepository(ClienteEmpresa)
        private readonly clienteEmpresaRepository: Repository<ClienteEmpresa>
    ) {

    }

    async create(cliente: Cliente): Promise<Cliente> {
        if (cliente instanceof ClientePersona && !(cliente instanceof ClienteEmpresa)) {
            const clientePersona = cliente as ClientePersona;
            return await this.crearClientePersona(clientePersona);
        }
        if (cliente instanceof ClienteEmpresa && !(cliente instanceof ClientePersona)) {
            const clienteEmpresa = cliente as ClienteEmpresa;
            return await this.crearClienteEmpresa(clienteEmpresa);
        }
        // fallback: save as base Cliente if not Persona or Empresa
        const nuevoCliente = this.clienteRepository.create(cliente);
        return await this.clienteRepository.save(nuevoCliente);
    }
    async crearClientePersona(dto: ClientePersona): Promise<ClientePersona> {
        const nuevoCliente = this.clienteEmpresaRepository.create(dto);
        return await this.clientePersonaRepository.save(nuevoCliente);
    }

    async crearClienteEmpresa(dto: ClienteEmpresa): Promise<ClienteEmpresa> {
        const nuevoCliente = this.clienteRepository.create(dto);
        return await this.clienteEmpresaRepository.save(nuevoCliente);
    }


    async findAll() {
        return await this.clienteRepository.find();
    }

    async findByEmail(email: string): Promise<boolean> {
        const usuario = await this.clienteRepository.findOneBy({ email });
        return !!usuario;
    }

}
