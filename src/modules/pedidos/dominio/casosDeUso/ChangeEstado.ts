import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PedidoRepository } from '../interfaces/repositorio/PedidoRepository';
import { ApiRestPedidosRepository } from '../../infraestructura/ApiRestPedidosRepository';
import {
  EstadosPedido,
  Pedido,
} from '../../infraestructura/entities/pedido.entity';
import { NotificacionesRepository } from 'src/modules/notificacion/dominio/interfaces/NotificacionesRepository';
import { ApiRestNotificacionesRepository } from 'src/modules/notificacion/infraestructura/ApiRestNotificacionesRepository';

@Injectable()
export class ChangeEstado {
  constructor(
    @Inject(forwardRef(() => ApiRestPedidosRepository))
    private readonly pedidoRepository: PedidoRepository,
    @Inject(forwardRef(() => ApiRestNotificacionesRepository))
    private readonly notificacionesRepostory: NotificacionesRepository,
  ) {}

  async ejecutar(id: number, estado: EstadosPedido): Promise<Pedido> {
    const pedido: Pedido = await this.pedidoRepository.changeEstado(id, estado);

    await this.notificacionesRepostory.MandarNotificacion(
      pedido.cliente.id,
      'cambioEstado',
      'El estado del pedido ha cambiado a ' + estado,
    );

    return pedido;
  }
}
