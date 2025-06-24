// src/modules/cliente/dominio/casosDeUso/ActualizarCliente.ts
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PedidoRepository } from '../interfaces/repositorio/PedidoRepository';
import { Pedido } from '../../infraestructura/entities/pedido.entity';
import { ApiRestPedidosRepository } from '../../infraestructura/ApiRestPedidosRepository';

@Injectable()
export class PagarPedido {
  constructor(
    @Inject(forwardRef(() => ApiRestPedidosRepository))
    private readonly pedidoRepository: PedidoRepository,
  ) {}

  async ejecutar(pedido: Pedido): Promise<{ response: object }> {
    console.log('Ejecutando caso de uso PagarPedido con pedido:');
    const result = await this.pedidoRepository.pagarPedido(pedido);
    console.log('Ejecutando caso de uso PagarPedido con pedido:', result);
    return { response: result };
  }
}
