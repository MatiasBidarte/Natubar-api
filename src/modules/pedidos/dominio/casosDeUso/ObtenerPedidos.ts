import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ApiRestPedidosRepository } from '../../infraestructura/ApiRestPedidosRepository';
import { PedidoRepository } from '../interfaces/repositorio/PedidoRepository';
import { PedidoDto } from '../dto/pedido.dto';

@Injectable()
export class ObtenerPedidos {
  constructor(
    @Inject(forwardRef(() => ApiRestPedidosRepository))
    private readonly pedidoRepository: PedidoRepository,
  ) {}

  async ejecutar(): Promise<PedidoDto[]> {
    return await this.pedidoRepository.obtenerTodos();
  }
}
