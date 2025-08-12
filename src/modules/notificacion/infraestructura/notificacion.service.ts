import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuscripcionNotificacion } from './entities/suscripcionNotificacion.entity';
import { Repository } from 'typeorm';
import { NotificacionPushDto } from '../dominio/dto/NotificacionPushDto ';
import { OneSignalService } from 'nestjs-onesignal';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(SuscripcionNotificacion)
    private readonly notificacionesRepository: Repository<SuscripcionNotificacion>,
    private readonly oneSignalService: OneSignalService,
    private readonly configService: ConfigService,
  ) {}

  async MandarNotificacion(dto: NotificacionPushDto): Promise<void> {
    try {
      if (!dto.playersId || dto.playersId.length === 0) {
        console.warn('No se puede enviar notificación: playersId vacío');
        return;
      }
      const client = this.oneSignalService.client as {
        createNotification: (data: any) => Promise<any>;
      };
      await client.createNotification({
        app_id: this.configService.get<string>('ONESIGNAL_APP_ID'),
        include_player_ids: dto.playersId,
        headings: { en: dto.cabezal || 'Notificación' },
        contents: { en: dto.mensaje },
      });
    } catch (error) {
      console.error('Error al enviar notificación:', error);
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

  async buscarSuscripciones(
    clienteId: number,
  ): Promise<SuscripcionNotificacion[]> {
    return await this.notificacionesRepository.find({
      where: { clienteId },
    });
  }
}
