/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  HttpStatus,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PedidoRepository } from '../dominio/interfaces/repositorio/PedidoRepository';
import { PedidosService } from './pedidos.service';
import { AuthService } from 'src/auth/auth.service';
import { PedidoDto } from '../dominio/dto/pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { ClienteService } from 'src/modules/cliente/infraestructura/cliente.service';
import { Cliente } from 'src/modules/cliente/infraestructura/entities/cliente.entity';
import { map } from 'rxjs';
import { ProductosService } from 'src/modules/productos/infraestructura/productos.service';
import { In } from 'typeorm';
import { PedidoMapper } from '../dominio/mappers/pedido-mapper';
import { DetallePedidoMapper } from '../dominio/mappers/detalle-pedido-mapper';
import { validate } from 'class-validator';

@Injectable()
export class ApiRestPedidosRepository implements PedidoRepository {
  constructor(
    @Inject(forwardRef(() => PedidosService))
    private readonly contextPedido: PedidosService,
    @Inject(forwardRef(() => ClienteService))
    private readonly contextCliente: ClienteService,
    @Inject(forwardRef(() => ProductosService))
    private readonly contextProducto: ProductosService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  obtenerTodos(): Pedido[] | PromiseLike<Pedido[]> {
    return this.contextPedido.obtenerPedidos();
  }
  async crearPedido(pedidoDto: PedidoDto): Promise<Pedido> {
    if (!pedidoDto.cliente?.id) {
      throw new BadRequestException('El id del cliente es requerido');
    }
    const cliente = await this.contextCliente.findById(pedidoDto.cliente.id);
    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }
    const pedido = PedidoMapper.toDomain(pedidoDto);
    pedido.cliente = cliente;
    pedido.detallesPedidos = [];

    if (
      !pedidoDto.detalleProductos ||
      pedidoDto.detalleProductos.length === 0
    ) {
      throw new BadRequestException(
        'La lista de detalleProductos es requerida y no puede estar vacía',
      );
    }
    for (const detalleDto of pedidoDto.detalleProductos) {
      const producto = await this.contextProducto.findById(
        detalleDto.producto.id,
      );
      if (!producto) {
        throw new NotFoundException(
          `Producto ${detalleDto.producto.id} no encontrado`,
        );
      }
      const detalle = DetallePedidoMapper.toDomain(detalleDto);
      detalle.producto = producto;
      pedido.addDetallePedido(detalle);
    }
    const pedidoGuardado = await this.contextPedido.crearPedido(pedido);
    return pedidoGuardado;
  }

  confirmarPedido(preferenceId: string): Promise<Pedido> {
    return this.contextPedido.confirmarPedido(preferenceId);
  }
}
