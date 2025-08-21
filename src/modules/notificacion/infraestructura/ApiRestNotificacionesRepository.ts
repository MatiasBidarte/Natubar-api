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

    await this.service.MandarNotificacion({
      playersId: suscripciones.map((s) => s.playerId),
      clienteId,
      cabezal,
      mensaje,
    });
  }

  async MandarNotificacionIndividual(
    cabezal: string,
    mensaje: string,
    tipoCliente: string,
    fecha: Date | undefined,
  ): Promise<void> {
    await this.service.MandarNotificacionIndividual({
      cabezal,
      mensaje,
      tipoCliente,
      fecha,
    });
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
