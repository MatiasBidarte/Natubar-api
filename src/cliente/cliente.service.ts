import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { CreateClienteDto } from './dto/crear-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { find } from 'rxjs';
import { Persona } from 'src/cliente-persona/entities/persona.entity';
import { ClienteEmpresa } from 'src/cliente-empresa/entities/cliente-empresa.entity';

@Injectable()
export class ClienteService {
    constructor(
        @InjectRepository(Cliente)
        private readonly clienteRepository: Repository<Cliente>,

    ) {

    }

    async create(cliente: Cliente){
        if (cliente instanceof Persona && !(cliente instanceof ClienteEmpresa)) {
            const clientePersona = cliente as Persona;
            const nuevoCliente = this.clienteRepository.create(clientePersona);
            return await this.clienteRepository.save(nuevoCliente);
        }
        if (cliente instanceof ClienteEmpresa && !(cliente instanceof Persona)) {
            const clienteEmpresa = cliente as ClienteEmpresa;
            const nuevoCliente = this.clienteRepository.create(clienteEmpresa);
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
