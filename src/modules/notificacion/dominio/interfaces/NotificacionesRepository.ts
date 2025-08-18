import { SuscripcionNotificacion } from '../../infraestructura/entities/suscripcionNotificacion.entity';

export interface NotificacionesRepository {
  MandarNotificacion(
    clienteId: number,
    cabezal: string,
    mensaje: string,
  ): Promise<void>;
  MandarNotificacionIndividual(
    cabezal: string,
    mensaje: string,
    tipoCliente: string,
    fechaProgramada?: Date,
  ): Promise<void>;
  SuscribirDispositivo(notificacion: SuscripcionNotificacion): Promise<void>;
  DesuscribirDispositivo(notificacion: SuscripcionNotificacion): Promise<void>;
  BuscarSuscripcionesDeCliente(
    clienteId: number,
  ): Promise<SuscripcionNotificacion[]>;
}
