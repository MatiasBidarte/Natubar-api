import { Body, Controller, Post } from '@nestjs/common';
import { SuscripcionNotificacion } from './entities/suscripcionNotificacion.entity';
import { SuscribirDispositivo } from '../dominio/casosDeUso/SuscribirDispositivo';
import { DesuscribirDispositivo } from '../dominio/casosDeUso/DesuscribirDispositivo';
import { NotificacionPushDto } from '../dominio/dto/NotificacionPushDto ';
import { MandarNotificacion } from '../dominio/casosDeUso/MandarNotificacion';
import { RecordarPago } from 'src/modules/pedidos/dominio/casosDeUso/RecordarPago';

@Controller('notificacion')
export class NotificacionController {
  constructor(
    private readonly suscribir: SuscribirDispositivo,
    private readonly desuscribir: DesuscribirDispositivo,
    private readonly notificar: MandarNotificacion,
    private readonly recordarPago: RecordarPago,
  ) {}

  @Post('suscribirDispositivo')
  public async suscribirDispositivo(
    @Body() notificacion: SuscripcionNotificacion,
  ): Promise<void> {
    await this.suscribir.ejecutar(notificacion);
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

  @Post('mandarNotificacion')
  public async mandarNotificacion(
    @Body() notificacion: NotificacionPushDto,
  ): Promise<void> {
    return await this.notificar.ejecutar(notificacion);
  }

  @Post('recordarPago')
  async RecordarPago(@Body() body: { pedido: number }) {
    const { pedido } = body;
    await this.recordarPago.ejecutar(pedido);
  }
}
