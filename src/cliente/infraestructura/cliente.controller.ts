import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { CreateClienteDto } from '../dominio/dto/crear-cliente.dto';
import { plainToInstance } from 'class-transformer';
import { validate } from 'class-validator';
import { ClientePersona } from 'src/cliente-persona/entities/cliente-persona.entity';
import { ClienteEmpresa } from 'src/cliente-empresa/entities/cliente-empresa.entity';
import { AltaCliente } from '../dominio/casosDeUso/AltaCliente';
import { ObtenerTodosCliente } from '../dominio/casosDeUso/ObtenerTodosCliente';

@Controller('cliente')
export class ClienteController {
  constructor(
    private readonly alta: AltaCliente,
    private readonly obtenerTodos: ObtenerTodosCliente,
  ) {}
  @Post()
  async add(@Body() clienteDto: CreateClienteDto) {
    try {
      let cliente: ClientePersona | ClienteEmpresa;
      if (clienteDto.discriminador === ClientePersona.discriminador) {
        cliente = plainToInstance(ClientePersona, clienteDto, {
          enableImplicitConversion: true,
        });
      } else {
        cliente = plainToInstance(ClienteEmpresa, clienteDto);
      }

      const errores = await validate(cliente as object);
      if (errores.length > 0) {
        const mensajes = errores.map((err) => ({
          propiedad: err.property,
          error: err.constraints
            ? Object.values(err.constraints)
            : ['Error desconocido'],
        }));
        throw new BadRequestException(JSON.stringify(mensajes));
      }
      return this.alta.ejecutar(cliente);
    } catch (ex) {
      if (ex instanceof BadRequestException) {
        throw new BadRequestException(
          `Error al crear el cliente: ${ex.message}`,
        );
      } else if (ex instanceof HttpException) {
        throw new HttpException(
          `El correo ${clienteDto.email} ya está en uso.`,
          HttpStatus.CONFLICT,
        );
      } else {
        throw new InternalServerErrorException(
          'Error al crear el cliente: error desconocido',
        );
      }
    }
  }

  @Get()
  findAll() {
    return this.obtenerTodos.ejecutar();
  }

  @Get('Prueba')
  prueba() {
    return 'Hola';
  }
}
