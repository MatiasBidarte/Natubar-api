import {
  BadRequestException,
  Body,
  Controller,
  InternalServerErrorException,
  Post,
} from '@nestjs/common';
import { PedidoDto } from '../dominio/dto/pedido.dto';
import { PagarPedido } from '../dominio/casosDeUso/PagarPedido';
import { PedidoMapper } from '../dominio/mappers/pedido-mapper';
import { validate } from 'class-validator';
import { ClienteDto } from 'src/modules/cliente/dominio/dto/cliente.dto';
@Controller('pedidos')
export class PedidosController {
  constructor(private readonly pagar: PagarPedido) {}
  @Post('pagarPedido')
  async pagarPedido(@Body() pedidoDto: PedidoDto): Promise<object> {
    try {
      // Si el pedidoDto llega vacío, usa uno de prueba
      const isEmpty =
        !pedidoDto || Object.keys(pedidoDto).length === 0 || !pedidoDto.id;
      const pedidoDePrueba: PedidoDto = {
        id: 999,
        fechaEntrega: new Date(),
        fechaEntregaEstimada: new Date(Date.now() + 86400000),
        montoTotal: 100,
        descuento: 0,
        productos: [
          {
            id: 1,
            cantidad: 2,
            producto: {
              id: 1,
              nombre: 'Barra de Cereal Energética',
              descripcion:
                'Una mezcla perfecta de avena, miel y almendras para recargar tu energía.',
              precioEmpresas: 300,
              precioPersonas: 400,
              stock: true,
              // agrega aquí otros campos requeridos por tu ProductoDto si los hay
            },
          },
          {
            id: 2,
            cantidad: 1,
            producto: {
              id: 2,
              nombre: 'Barra Proteica Choco-Nuez',
              descripcion:
                'Deliciosa barra alta en proteínas con cacao y nueces.',
              precioEmpresas: 500,
              precioPersonas: 600,
              stock: true,
              // agrega aquí otros campos requeridos por tu ProductoDto si los hay
            },
          },
        ],
        cliente: {
          id: 1,
          email: 'prueba1@gmail.com',
          contrasena: 'Montevideo111!',
          observaciones: 'AAAA',
          departamento: 'Montevideo',
          ciudad: 'Montevideo',
          direccion: 'Calle Falsa 123',
          telefono: '123456789',
        } as ClienteDto,
      };
      const pedido = PedidoMapper.toDomain(pedidoDePrueba);
      console.log('Pedido a pagar:', pedido);
      const errores = await validate(pedido as object);
      if (errores.length > 0) {
        const mensajes = errores.map((err) => ({
          propiedad: err.property,
          error: err.constraints
            ? Object.values(err.constraints)
            : ['Error desconocido'],
        }));
        console.log('Errores de validación:', mensajes);
        throw new BadRequestException(JSON.stringify(mensajes));
      }
      return this.pagar.ejecutar(pedido);
    } catch (ex) {
      if (ex instanceof BadRequestException) {
        const errorObject = JSON.parse(ex.message) as {
          propiedad: string;
          error: string[];
        }[];
        const errorMessage =
          errorObject[0]?.error?.join(', ') || 'Error desconocido';
        throw new BadRequestException({
          message: `Error al crear el pedido: ${errorMessage}`,
          statusCode: ex.getStatus(),
        });
      } else {
        throw new InternalServerErrorException(
          'Error al crear el pedido: intente mas tarde',
        );
      }
    }
  }
}
