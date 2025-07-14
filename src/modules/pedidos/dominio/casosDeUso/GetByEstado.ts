import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ApiRestPedidosRepository } from '../../infraestructura/ApiRestPedidosRepository';
import { PedidoRepository } from '../interfaces/repositorio/PedidoRepository';
import {
  EstadosPedido,
  Pedido,
} from '../../infraestructura/entities/pedido.entity';

@Injectable()
export class GetByEstado {
  constructor(
    @Inject(forwardRef(() => ApiRestPedidosRepository))
    private readonly pedidoRepository: PedidoRepository,
  ) {}

  async ejecutar(estado: EstadosPedido): Promise<Pedido[]> {
    const pedidoCreado = await this.pedidoRepository.getByEstado(estado);
    return pedidoCreado;
  }
}
