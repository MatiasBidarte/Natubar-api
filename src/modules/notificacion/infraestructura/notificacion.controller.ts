import { Controller } from '@nestjs/common';
import { SuscripcionNotificacion } from './entities/suscripcionNotificacion.entity';
import { SuscribirDispositivo } from '../dominio/casosDeUso/SuscribirDispositivo';
import { DesuscribirDispositivo } from '../dominio/casosDeUso/DesuscribirDispositivo';

@Controller('notificacion')
export class NotificacionController {
  constructor(
    private readonly suscribir: SuscribirDispositivo,
    private readonly desuscribir: DesuscribirDispositivo,
  ) {}

  public async suscribirDispositivo(
    notificacion: SuscripcionNotificacion,
  ): Promise<void> {
    return await this.suscribir.ejecutar(notificacion);
  }

  public async desuscribirDispositivo(
    notificacion: SuscripcionNotificacion,
  ): Promise<void> {
    return await this.suscribir.ejecutar(notificacion);
  }
}
