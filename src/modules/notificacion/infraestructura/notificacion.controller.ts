import { Controller } from '@nestjs/common';
import { SuscripcionNotificacion } from './entities/suscripcionNotificacion.entity';
import { SuscribirDispositivo } from '../dominio/casosDeUso/SuscribirDispositivo';
import { DesuscribirDispositivo } from '../dominio/casosDeUso/DesuscribirDispositivo';
import { NotificacionPushDto } from '../dominio/dto/NotificacionPushDto ';
import { MandarNotificacion } from '../dominio/casosDeUso/MandarNotificacion';

@Controller('notificacion')
export class NotificacionController {
  constructor(
    private readonly suscribir: SuscribirDispositivo,
    private readonly desuscribir: DesuscribirDispositivo,
    private readonly notificar: MandarNotificacion,
  ) {}

  public async suscribirDispositivo(
    notificacion: SuscripcionNotificacion,
  ): Promise<void> {
    return await this.suscribir.ejecutar(notificacion);
  }

  public async desuscribirDispositivo(
    notificacion: SuscripcionNotificacion,
  ): Promise<void> {
    return await this.desuscribir.ejecutar(notificacion);
  }

  public async mandarNotificacion(
    notificacion: NotificacionPushDto,
  ): Promise<void> {
    return await this.notificar.ejecutar(notificacion);
  }
}
