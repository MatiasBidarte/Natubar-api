import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { PedidoRepository } from '../interfaces/repositorio/PedidoRepository';
import { ApiRestPedidosRepository } from '../../infraestructura/ApiRestPedidosRepository';
import { PedidoDto } from '../dto/pedido.dto';
import { NotificacionesRepository } from 'src/modules/notificacion/dominio/interfaces/NotificacionesRepository';
import { ApiRestNotificacionesRepository } from 'src/modules/notificacion/infraestructura/ApiRestNotificacionesRepository';

@Injectable()
export class RecordarPago {
  constructor(
    @Inject(forwardRef(() => ApiRestPedidosRepository))
    private readonly pedidoRepository: PedidoRepository,
    @Inject(forwardRef(() => ApiRestNotificacionesRepository))
    private readonly notificacionesRepostory: NotificacionesRepository,
  ) {}

  async ejecutar(id: number): Promise<PedidoDto> {
    const pedido = await this.pedidoRepository.findById(id);

    if (pedido.cliente && pedido.cliente.id !== undefined) {
      await this.notificacionesRepostory.MandarNotificacion(
        pedido.cliente.id,
        'Tus barritas están en pausa 😅',
        `Parece que el pago no se completó. ¡Dales luz verde y llegan volando!`,
      );
    }
    pedido.ultimoRecordatorioPago = new Date();
    await this.pedidoRepository.ingresarFechaUltimoRecordatorioPago(pedido);
    return pedido;
  }
}
