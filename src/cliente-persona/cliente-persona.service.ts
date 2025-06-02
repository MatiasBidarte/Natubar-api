import { Injectable } from '@nestjs/common';
import { CreateClientePersonaDto } from './dto/create-cliente-persona.dto';
import { UpdateClientePersonaDto } from './dto/update-cliente-persona.dto';

@Injectable()
export class ClientePersonaService {
  create(createClientePersonaDto: CreateClientePersonaDto) {
    return 'This action adds a new clientePersona';
  }

  findAll() {
    return `This action returns all clientePersona`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clientePersona`;
  }

  update(id: number, updateClientePersonaDto: UpdateClientePersonaDto) {
    return `This action updates a #${id} clientePersona`;
  }

  remove(id: number) {
    return `This action removes a #${id} clientePersona`;
  }
}
