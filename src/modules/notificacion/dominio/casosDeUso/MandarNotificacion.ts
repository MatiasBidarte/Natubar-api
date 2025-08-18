import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ApiRestNotificacionesRepository } from '../../infraestructura/ApiRestNotificacionesRepository';
import { NotificacionPushDto } from '../dto/NotificacionPushDto ';

@Injectable()
export class MandarNotificacion {
  constructor(
    @Inject(forwardRef(() => ApiRestNotificacionesRepository))
    private readonly notificacionesRepository: ApiRestNotificacionesRepository,
  ) {}

  async ejecutar(notificacion: NotificacionPushDto): Promise<void> {
    if (
      notificacion.tipoCliente != null &&
      notificacion.tipoCliente.length != 0
    ) {
      await this.notificacionesRepository.MandarNotificacionIndividual(
        notificacion.cabezal,
        notificacion.mensaje,
        notificacion.tipoCliente,
        notificacion.fecha,
      );
    }
    if (notificacion.clienteId != null) {
      await this.notificacionesRepository.MandarNotificacion(
        notificacion.clienteId,
        notificacion.cabezal,
        notificacion.mensaje,
      );
    }
  }
}
