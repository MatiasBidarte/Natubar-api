import {
  BadRequestException,
  Body,
  Controller,
  Get,
  HttpException,
  InternalServerErrorException,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ClienteDto } from '../dominio/dto/cliente.dto';
import { LoginClienteDto } from '../dominio/dto/login-cliente.dto';
import { validate } from 'class-validator';
import { ClientePersona } from 'src/modules/cliente/infraestructura/entities/cliente-persona.entity';
import { ClienteEmpresa } from 'src/modules/cliente/infraestructura/entities/cliente-empresa.entity';
import { AltaCliente } from '../dominio/casosDeUso/AltaCliente';
import { LoginCliente } from '../dominio/casosDeUso/Login';
import { ObtenerTodosCliente } from '../dominio/casosDeUso/ObtenerTodosCliente';
import { ActualizarClienteDto } from '../dominio/dto/actualizar-cliente.dto';
import { ActualizarCliente } from '../dominio/casosDeUso/ActualizarCliente';
import { PedidosDeCliente } from '../dominio/casosDeUso/PedidosDeCliente';

@Controller('clientes')
export class ClienteController {
  constructor(
    private readonly alta: AltaCliente,
    private readonly obtenerTodos: ObtenerTodosCliente,
    private readonly loginCU: LoginCliente,
    private readonly actualizar: ActualizarCliente,
    private readonly pedidosDeCliente: PedidosDeCliente,
  ) {}
  @Post()
  async add(@Body() clienteDto: ClienteDto) {
    try {
      let cliente: ClientePersona | ClienteEmpresa;
      if (clienteDto.tipo === ClientePersona.tipo) {
        cliente = new ClientePersona(
          clienteDto.email,
          clienteDto.contrasena,
          clienteDto.observaciones,
          clienteDto.departamento,
          clienteDto.ciudad,
          clienteDto.direccion,
          clienteDto.telefono,
          clienteDto.nombre!,
          clienteDto.apellido!,
        );
      } else {
        cliente = new ClienteEmpresa(
          clienteDto.email,
          clienteDto.contrasena,
          clienteDto.observaciones,
          clienteDto.departamento,
          clienteDto.ciudad,
          clienteDto.direccion,
          clienteDto.telefono,
          clienteDto.nombreContacto!,
          clienteDto.rut!,
          clienteDto.nombreEmpresa!,
        );
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
      await cliente.setPassword();
      return this.alta.ejecutar(cliente);
    } catch (ex) {
      if (ex instanceof BadRequestException) {
        const errorObject = JSON.parse(ex.message) as {
          propiedad: string;
          error: string[];
        }[];
        const errorMessage =
          errorObject[0]?.error?.join(', ') || 'Error desconocido';
        throw new BadRequestException({
          message: `Error al crear el cliente: ${errorMessage}`,
          statusCode: ex.getStatus(),
        });
      } else if (ex instanceof HttpException) {
        throw new HttpException(
          `El correo ${clienteDto.email} ya está en uso.`,
          ex.getStatus(),
        );
      } else {
        throw new InternalServerErrorException(
          'Error al crear el cliente: intente mas tarde',
        );
      }
    }
  }

  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() clienteDto: ActualizarClienteDto,
  ) {
    try {
      const resultado = await this.actualizar.ejecutar(id, clienteDto);
      return {
        message: 'Datos actualizados correctamente',
        cliente: resultado.cliente,
        access_token: resultado.access_token,
      };
    } catch (ex) {
      if (ex instanceof HttpException) {
        throw ex;
      } else {
        throw new InternalServerErrorException(
          'Error al actualizar el cliente: intente mas tarde',
        );
      }
    }
  }

  @Get(':id/pedidos')
  async getPedidos(@Param('id') id: number) {
    try {
      return await this.pedidosDeCliente.ejecutar(id);
    } catch (ex) {
      if (ex instanceof HttpException) {
        throw ex;
      } else {
        console.log(ex);
        throw new InternalServerErrorException(
          'Error al obtener los pedidos del cliente: intente mas tarde',
        );
      }
    }
  }

  @Get('Prueba')
  prueba() {
    return 'Hola';
  }

  @Post('login')
  async login(@Body() clienteDto: LoginClienteDto) {
    return await this.loginCU.ejecutar(clienteDto);
  }
}
