import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PedidoRepository } from '../interfaces/repositorio/PedidoRepository';
import { ApiRestPedidosRepository } from '../../infraestructura/ApiRestPedidosRepository';
import {
  EstadosPedido,
  Pedido,
} from '../../infraestructura/entities/pedido.entity';

@Injectable()
export class ChangeEstado {
  constructor(
    @Inject(forwardRef(() => ApiRestPedidosRepository))
    private readonly pedidoRepository: PedidoRepository,
  ) {}

  async ejecutar(id: number, estado: EstadosPedido): Promise<Pedido> {
    const pedido: Pedido = await this.pedidoRepository.changeEstado(id, estado);
    return pedido;
  }
}
