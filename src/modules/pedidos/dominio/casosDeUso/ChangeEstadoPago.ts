import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PedidoRepository } from '../interfaces/repositorio/PedidoRepository';
import { ApiRestPedidosRepository } from '../../infraestructura/ApiRestPedidosRepository';
import {
  EstadosPago,
  Pedido,
} from '../../infraestructura/entities/pedido.entity';

@Injectable()
export class ChangeEstadoPago {
  constructor(
    @Inject(forwardRef(() => ApiRestPedidosRepository))
    private readonly pedidoRepository: PedidoRepository,
  ) {}

  async ejecutar(id: number, estado: EstadosPago): Promise<Pedido> {
    const pedido: Pedido = await this.pedidoRepository.changeEstadoPago(
      id,
      estado,
    );
    return pedido;
  }
}
