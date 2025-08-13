import {
  Injectable,
  HttpException,
  InternalServerErrorException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { SuscripcionNotificacion } from './entities/suscripcionNotificacion.entity';
import { Repository } from 'typeorm';
import { NotificacionPushDto } from '../dominio/dto/NotificacionPushDto ';
import { ConfigService } from '@nestjs/config';
import axios from 'axios';
@Injectable()
export class NotificacionService {
  constructor(
    @InjectRepository(SuscripcionNotificacion)
    private readonly notificacionesRepository: Repository<SuscripcionNotificacion>,
    private readonly configService: ConfigService,
  ) {}
  async MandarNotificacion(dto: NotificacionPushDto): Promise<any> {
    try {
      if (!dto.playersId || dto.playersId.length === 0) {
        console.warn('No se puede enviar notificación: playersId vacío');
        return;
      }

      const data = {
        app_id: this.configService.get<string>('ONESIGNAL_APP_ID'),
        target_channel: 'push',
        include_aliases: {
          onesignal_id: dto.playersId, // Aquí estás usando OneSignal User IDs
        },
        headings: { en: dto.cabezal || 'Notificación' },
        contents: { en: dto.mensaje },
      };

      const response = await axios.post(
        `${this.configService.get<string>('BASE_URL_ONESIGNAL')}/notifications`,
        data,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Basic ${this.configService.get<string>('ONESIGNAL_APP_KEY')}`,
          },
        },
      );
      return response.data;
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const message =
          typeof error.response?.data === 'string'
            ? error.response.data
            : 'Error al enviar la notificación';

        throw new BadRequestException(message);
      }

      if (error instanceof HttpException) {
        throw error;
      }

      throw new InternalServerErrorException(
        'Error desconocido al enviar la notificación.',
      );
    }
  }
  async SuscribirDispositivo(
    notificacion: SuscripcionNotificacion,
  ): Promise<void> {
    try {
      const existe = await this.notificacionesRepository.findOne({
        where: { playerId: notificacion.playerId },
      });

      if (!existe) {
        await this.notificacionesRepository.save(notificacion);
      }
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
