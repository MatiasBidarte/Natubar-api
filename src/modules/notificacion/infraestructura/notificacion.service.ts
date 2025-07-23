import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuscripcionNotificacion } from './entities/suscripcionNotificacion.entity';
import { Repository } from 'typeorm';

@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(SuscripcionNotificacion)
    private readonly notificacionesRepository: Repository<SuscripcionNotificacion>,
  ) {}
  async MandarNotificacion(
    notificacion: SuscripcionNotificacion,
  ): Promise<void> {
    try {
      await fetch('https://onesignal.com/api/v1/notifications', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Basic ${process.env.ONESIGNAL_API_KEY}`,
        },
        body: JSON.stringify({
          app_id: process.env.ONESIGNAL_APP_ID,
          include_player_ids: [notificacion.dispositivo],
          headings: { en: '¡Hola!' },
          contents: { en: 'Tu pedido cambió de estado' },
        }),
      });
    } catch (error) {
      console.error('Error al crear notificación:', error);
      throw error;
    }
  }

  async SuscribirDispositivo(
    notificacion: SuscripcionNotificacion,
  ): Promise<void> {
    try {
      await this.notificacionesRepository.save(notificacion);
    } catch (error) {
      console.error('Error al crear notificación:', error);
      throw error;
    }
  }

  async DesuscribirDispositivo(
    notificacion: SuscripcionNotificacion,
  ): Promise<void> {
    try {
      await this.notificacionesRepository.remove(notificacion);
    } catch (error) {
      console.error('Error al borar suscripcion:', error);
      throw error;
    }
  }
}
