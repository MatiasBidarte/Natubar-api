import { Body, Controller, Get, Post } from '@nestjs/common';
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

  @Post('suscribirDispositivo')
  public async suscribirDispositivo(@Body() notificacion: any): Promise<void> {
    return await this.suscribir.ejecutar(notificacion);
  }
  @Post('desuscribirDispositivo')
  public async desuscribirDispositivo(
    @Body()
    body: {
      notificacion: SuscripcionNotificacion;
    },
  ): Promise<void> {
    return await this.desuscribir.ejecutar(body.notificacion);
  }

  public async mandarNotificacion(
    notificacion: NotificacionPushDto,
  ): Promise<void> {
    return await this.notificar.ejecutar(notificacion);
  }
}
