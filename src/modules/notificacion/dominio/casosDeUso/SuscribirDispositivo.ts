import { Injectable, Inject, forwardRef } from '@nestjs/common';
import { ApiRestNotificacionesRepository } from '../../infraestructura/ApiRestNotificacionesRepository';
import { SuscripcionNotificacion } from '../../infraestructura/entities/suscripcionNotificacion.entity';

@Injectable()
export class SuscribirDispositivo {
  constructor(
    @Inject(forwardRef(() => ApiRestNotificacionesRepository))
    private readonly notificacionesRepository: ApiRestNotificacionesRepository,
  ) {}

  async ejecutar(notificacion: SuscripcionNotificacion): Promise<void> {
    await this.notificacionesRepository.SuscribirDispositivo(notificacion);
  }
}
