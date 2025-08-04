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
    clienteId: number,
    cabezal: string,
    mensaje: string,
  ): Promise<void> {
    const suscripciones = await this.service.buscarSuscripciones(clienteId);
    for (const suscripcion of suscripciones) {
      await this.service.MandarNotificacion({
        playerId: suscripcion.playerId,
        clienteId,
        cabezal,
        mensaje,
        dispositivo: suscripcion.dispositivo,
      });
    }
  }

  async SuscribirDispositivo(
    notificacion: SuscripcionNotificacion,
  ): Promise<void> {
    await this.service.SuscribirDispositivo(notificacion);
  }

  async DesuscribirDispositivo(
    notificacion: SuscripcionNotificacion,
  ): Promise<void> {
    await this.service.DesuscribirDispositivo(notificacion);
  }
  async BuscarSuscripcionesDeCliente(
    clienteId: number,
  ): Promise<SuscripcionNotificacion[]> {
    return await this.service.buscarSuscripciones(clienteId);
  }
}
