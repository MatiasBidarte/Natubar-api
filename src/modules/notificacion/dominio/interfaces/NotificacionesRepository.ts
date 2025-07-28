import { SuscripcionNotificacion } from '../../infraestructura/entities/suscripcionNotificacion.entity';

export interface NotificacionesRepository {
  MandarNotificacion(
    clienteId: number,
    cabezal: string,
    mensaje: string,
  ): Promise<void>;
  SuscribirDispositivo(notificacion: SuscripcionNotificacion): Promise<void>;
  DesuscribirDispositivo(notificacion: SuscripcionNotificacion): Promise<void>;
  BuscarSuscripcionesDeCliente(
    clienteId: number,
  ): Promise<SuscripcionNotificacion[]>;
}
