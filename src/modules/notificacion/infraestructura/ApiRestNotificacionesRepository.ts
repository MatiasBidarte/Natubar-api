import { Injectable } from '@nestjs/common';
import { NotificacionesRepository } from '../dominio/interfaces/NotificacionesRepository';
import { NotificacionService } from './notificacion.service';
import { SuscripcionNotificacion } from './entities/suscripcionNotificacion.entity';

@Injectable()
export class ApiRestNotificacionesRepository
  implements NotificacionesRepository
{
  constructor(private readonly service: NotificacionService) {}

  async MandarNotificacion(
    notificacion: SuscripcionNotificacion,
  ): Promise<void> {
    // Delegates sending notification to the service and returns the result
    await this.service.MandarNotificacion(notificacion);
  }

  async SuscribirDispositivo(
    notificacion: SuscripcionNotificacion,
  ): Promise<void> {
    // Delegates device subscription to the service
    await this.service.SuscribirDispositivo(notificacion);
  }

  async DesuscribirDispositivo(
    notificacion: SuscripcionNotificacion,
  ): Promise<void> {
    // Delegates device unsubscription to the service
    await this.service.DesuscribirDispositivo(notificacion);
  }
}
