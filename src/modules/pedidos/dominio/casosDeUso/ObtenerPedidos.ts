import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ApiRestPedidosRepository } from '../../infraestructura/ApiRestPedidosRepository';
import { PedidoRepository } from '../interfaces/repositorio/PedidoRepository';
import { Pedido } from '../../infraestructura/entities/pedido.entity';

@Injectable()
export class ObtenerPedidos {
  constructor(
    @Inject(forwardRef(() => ApiRestPedidosRepository))
    private readonly pedidoRepository: PedidoRepository,
  ) {}

  async ejecutar(): Promise<Pedido[]> {
    return await this.pedidoRepository.obtenerTodos();
  }
}
