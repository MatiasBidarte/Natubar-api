import { SuscripcionNotificacion } from '../../infraestructura/entities/suscripcionNotificacion.entity';

export interface NotificacionesRepository {
  MandarNotificacion(notificacion: SuscripcionNotificacion): Promise<void>;
  SuscribirDispositivo(notificacion: SuscripcionNotificacion): Promise<void>;
  DesuscribirDispositivo(notificacion: SuscripcionNotificacion): Promise<void>;
}
