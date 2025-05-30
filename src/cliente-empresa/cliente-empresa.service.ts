import { Injectable } from '@nestjs/common';
import { CreateClienteEmpresaDto } from './dto/create-cliente-empresa.dto';
import { UpdateClienteEmpresaDto } from './dto/update-cliente-empresa.dto';

@Injectable()
export class ClienteEmpresaService {
  create(createClienteEmpresaDto: CreateClienteEmpresaDto) {
    return 'This action adds a new clienteEmpresa';
  }

  findAll() {
    return `This action returns all clienteEmpresa`;
  }

  findOne(id: number) {
    return `This action returns a #${id} clienteEmpresa`;
  }

  update(id: number, updateClienteEmpresaDto: UpdateClienteEmpresaDto) {
    return `This action updates a #${id} clienteEmpresa`;
  }

  remove(id: number) {
    return `This action removes a #${id} clienteEmpresa`;
  }
}
