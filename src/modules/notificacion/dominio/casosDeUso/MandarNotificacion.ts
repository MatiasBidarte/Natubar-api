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
    await this.notificacionesRepository.MandarNotificacion(
      notificacion.clienteId,
      notificacion.cabezal,
      notificacion.mensaje,
    );
  }
}
