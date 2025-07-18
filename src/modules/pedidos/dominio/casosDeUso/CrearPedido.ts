import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ApiRestPedidosRepository } from '../../infraestructura/ApiRestPedidosRepository';
import { PedidoRepository } from '../interfaces/repositorio/PedidoRepository';
import { PedidoDto } from '../dto/pedido.dto';
import { Pedido } from '../../infraestructura/entities/pedido.entity';

@Injectable()
export class CrearPedido {
  constructor(
    @Inject(forwardRef(() => ApiRestPedidosRepository))
    private readonly pedidoRepository: PedidoRepository,
  ) {}

  async ejecutar(pedido: PedidoDto): Promise<{ id: number }> {
    const pedidoCreado = (await this.pedidoRepository.crearPedido(
      pedido,
    )) as Pedido;
    return { id: pedidoCreado.id };
  }
}
