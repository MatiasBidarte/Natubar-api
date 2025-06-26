// src/modules/cliente/dominio/casosDeUso/ActualizarCliente.ts
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PedidoRepository } from '../interfaces/repositorio/PedidoRepository';
import { ApiRestPedidosRepository } from '../../infraestructura/ApiRestPedidosRepository';
import { PedidoDto } from '../dto/pedido.dto';
import { Pedido } from '../../infraestructura/entities/pedido.entity';

@Injectable()
export class CrearPedido {
  constructor(
    @Inject(forwardRef(() => ApiRestPedidosRepository))
    private readonly pedidoRepository: PedidoRepository,
  ) {}

  async ejecutar(pedido: PedidoDto): Promise<{ response: object }> {
    const pedidoCreado: Pedido =
      await this.pedidoRepository.crearPedido(pedido);
    return { response: pedidoCreado };
  }
}
