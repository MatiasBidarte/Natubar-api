import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PedidoRepository } from '../interfaces/repositorio/PedidoRepository';
import { ApiRestPedidosRepository } from '../../infraestructura/ApiRestPedidosRepository';
import { EstadosPago } from '../../infraestructura/entities/pedido.entity';
import { PedidoDto } from '../dto/pedido.dto';

@Injectable()
export class ChangeEstadoPago {
  constructor(
    @Inject(forwardRef(() => ApiRestPedidosRepository))
    private readonly pedidoRepository: PedidoRepository,
  ) {}

  async ejecutar(id: number, estado: EstadosPago): Promise<PedidoDto> {
    return await this.pedidoRepository.changeEstadoPago(id, estado);
  }
}
