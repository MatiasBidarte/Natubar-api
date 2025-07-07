// src/modules/cliente/dominio/casosDeUso/ActualizarCliente.ts
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PedidoRepository } from '../interfaces/repositorio/PedidoRepository';
import { ApiRestPedidosRepository } from '../../infraestructura/ApiRestPedidosRepository';
import { Pedido } from '../../infraestructura/entities/pedido.entity';

@Injectable()
export class ConfirmarPedido {
  constructor(
    @Inject(forwardRef(() => ApiRestPedidosRepository))
    private readonly pedidoRepository: PedidoRepository,
  ) {}

  async ejecutar(preferenceId: string): Promise<{ response: object }> {
    const pedidoConfirmado: Pedido =
      await this.pedidoRepository.confirmarPedido(preferenceId);
    return { response: pedidoConfirmado };
  }
}
