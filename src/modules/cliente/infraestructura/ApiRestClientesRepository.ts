/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { ClienteRepository } from '../dominio/Interfaces/repositorio/ClienteRepository';
import { ClienteService } from './cliente.service';
import { Cliente } from './entities/cliente.entity';
import { AuthService } from 'src/auth/auth.service';
import { CrearClienteResponseDto } from '../dominio/dto/cliente.dto';
import { ActualizarClienteDto } from '../dominio/dto/actualizar-cliente.dto';
import { ClientePersona } from './entities/cliente-persona.entity';
import { ClienteEmpresa } from './entities/cliente-empresa.entity';
import { Pedido } from 'src/modules/pedidos/infraestructura/entities/pedido.entity';
import { PedidoDto } from 'src/modules/pedidos/dominio/dto/pedido.dto';
import { PedidoMapper } from 'src/modules/pedidos/dominio/mappers/pedido-mapper';

@Injectable()
export class ApiRestClientesRepository implements ClienteRepository {
  constructor(
    private readonly context: ClienteService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  async pedidosPorCliente(id: number): Promise<PedidoDto[]> {
    const pedidos = await this.context.pedidoPorCliente(id);
    console.log(pedidos);
    return pedidos.map((pedido: Pedido) => PedidoMapper.toDto(pedido));
  }

  obtenerTodos(): Cliente[] | PromiseLike<Cliente[]> {
    return this.context.findAll();
  }

  async alta(cliente: Cliente): Promise<CrearClienteResponseDto> {
    try {
      if (await this.context.findByEmail(cliente.email)) {
        throw new HttpException('El correo ya está en uso.', 409);
      }
      await this.context.create(cliente);
      const token = await this.authService.signIn(
        cliente.email,
        cliente.contrasena,
      );
      return { access_token: token.access_token };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        console.log(error);
        throw new InternalServerErrorException(
          'Error desconocido al crear el cliente.',
        );
      }
    }
  }

  async actualizar(
    id: number,
    clienteDto: ActualizarClienteDto,
  ): Promise<{ cliente: Partial<Cliente>; access_token: string }> {
    try {
      const cliente = await this.context.findById(id);
      if (!cliente) {
        throw new HttpException('Cliente no encontrado', 404);
      }

      Object.entries(clienteDto).forEach(([key, value]) => {
        if (
          key !== 'observaciones' &&
          value !== undefined &&
          (value === '' || value === null)
        ) {
          throw new HttpException(
            `El campo ${key} no puede quedar vacío`,
            HttpStatus.BAD_REQUEST,
          );
        }
      });

      if (clienteDto.observaciones !== undefined) {
        cliente.observaciones = clienteDto.observaciones;
      }

      if (clienteDto.departamento !== undefined) {
        cliente.departamento = clienteDto.departamento;
      }
      if (clienteDto.ciudad !== undefined) {
        cliente.ciudad = clienteDto.ciudad;
      }
      if (clienteDto.direccion !== undefined) {
        cliente.direccion = clienteDto.direccion;
      }
      if (clienteDto.telefono !== undefined) {
        cliente.telefono = clienteDto.telefono;
      }

      if (cliente instanceof ClientePersona) {
        if (clienteDto.nombre !== undefined) {
          cliente.nombre = clienteDto.nombre;
        }
        if (clienteDto.apellido !== undefined) {
          cliente.apellido = clienteDto.apellido;
        }
      } else if (cliente instanceof ClienteEmpresa) {
        if (clienteDto.nombreEmpresa !== undefined) {
          cliente.nombreEmpresa = clienteDto.nombreEmpresa;
        }
        if (clienteDto.rut !== undefined) {
          cliente.rut = clienteDto.rut;
        }
        if (clienteDto.nombreContacto !== undefined) {
          cliente.nombreContacto = clienteDto.nombreContacto;
        }
      }

      const clienteActualizado = await this.context.update(cliente);
      const { contrasena, ...clienteSinContrasena } = clienteActualizado;
      const token = this.authService.generateTokenForUser(clienteSinContrasena);

      return {
        cliente: clienteSinContrasena,
        access_token: token.access_token,
      };
    } catch (error: unknown) {
      if (error instanceof HttpException) {
        throw error;
      } else {
        console.log(error);
        throw new InternalServerErrorException(
          'Error desconocido al actualizar el cliente.',
        );
      }
    }
  }
}
