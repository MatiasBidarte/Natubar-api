import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ApiRestPedidosRepository } from '../../infraestructura/ApiRestPedidosRepository';
import { PedidoRepository } from '../interfaces/repositorio/PedidoRepository';
import { EstadosPedido } from '../../infraestructura/entities/pedido.entity';
import { PedidoDto } from '../dto/pedido.dto';

@Injectable()
export class GetByEstado {
  constructor(
    @Inject(forwardRef(() => ApiRestPedidosRepository))
    private readonly pedidoRepository: PedidoRepository,
  ) {}

  async ejecutar(estado: EstadosPedido): Promise<PedidoDto[]> {
    return await this.pedidoRepository.getByEstado(estado);
  }
}
