import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClienteEmpresaService } from './cliente-empresa.service';
import { CreateClienteEmpresaDto } from './dto/create-cliente-empresa.dto';
import { UpdateClienteEmpresaDto } from './dto/update-cliente-empresa.dto';

@Controller('cliente-empresa')
export class ClienteEmpresaController {
  constructor(private readonly clienteEmpresaService: ClienteEmpresaService) {}

  @Post()
  create(@Body() createClienteEmpresaDto: CreateClienteEmpresaDto) {
    return this.clienteEmpresaService.create(createClienteEmpresaDto);
  }

  @Get()
  findAll() {
    return this.clienteEmpresaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clienteEmpresaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClienteEmpresaDto: UpdateClienteEmpresaDto) {
    return this.clienteEmpresaService.update(+id, updateClienteEmpresaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clienteEmpresaService.remove(+id);
  }
}
