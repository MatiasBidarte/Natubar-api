import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { ClientePersonaService } from './cliente-persona.service';
import { CreateClientePersonaDto } from './dto/create-cliente-persona.dto';
import { UpdateClientePersonaDto } from './dto/update-cliente-persona.dto';

@Controller('cliente-persona')
export class ClientePersonaController {
  constructor(private readonly clientePersonaService: ClientePersonaService) {}

  @Post()
  create(@Body() createClientePersonaDto: CreateClientePersonaDto) {
    return this.clientePersonaService.create(createClientePersonaDto);
  }

  @Get()
  findAll() {
    return this.clientePersonaService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.clientePersonaService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateClientePersonaDto: UpdateClientePersonaDto) {
    return this.clientePersonaService.update(+id, updateClientePersonaDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.clientePersonaService.remove(+id);
  }
}
