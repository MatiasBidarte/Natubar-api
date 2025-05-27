import { HttpException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { Cliente } from './entities/cliente.entity';
import { crearClienteDto } from './dto/crear-cliente.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { find } from 'rxjs';

@Injectable()
export class ClienteService {
    constructor(@InjectRepository(Cliente)
    private readonly clienteRepository: Repository<Cliente>) {

    }

    async create(cliente: Cliente): Promise<Cliente> {
        if (await this.findByEmail(cliente.email)) {
            throw new HttpException(`El email ${cliente.email} ya está registrado`, 409);
        }
        const nuevoCliente = this.clienteRepository.create(cliente);
        return await this.clienteRepository.save(nuevoCliente);
    }

    async findAll() {
        return await this.clienteRepository.find();
    }

    async findByEmail(email: string): Promise<boolean> {
        const usuario = await this.clienteRepository.findOneBy({ email });
        return !!usuario;
    }

}
