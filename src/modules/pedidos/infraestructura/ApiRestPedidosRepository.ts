/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  InternalServerErrorException,
  HttpStatus,
} from '@nestjs/common';
import { PedidoRepository } from '../dominio/interfaces/repositorio/PedidoRepository';
import { PedidosService } from './pedidos.service';
import { AuthService } from 'src/auth/auth.service';
import { PedidoDto } from '../dominio/dto/pedido.dto';
import { Pedido } from './entities/pedido.entity';
import { ClienteService } from 'src/modules/cliente/infraestructura/cliente.service';

@Injectable()
export class ApiRestPedidosRepository implements PedidoRepository {
  constructor(
    @Inject(forwardRef(() => PedidosService))
    private readonly contextPedido: PedidosService,
    @Inject(forwardRef(() => ClienteService))
    private readonly contextCliente: ClienteService,
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}

  obtenerTodos(): Pedido[] | PromiseLike<Pedido[]> {
    return this.contextPedido.obtenerPedidos();
  }
  pagarPedido(pedido: Pedido): Promise<object> {
    return this.contextPedido.pagarPedido(pedido);
  }
}
