import { forwardRef, Module } from '@nestjs/common';
import { NotificacionService } from './notificacion.service';
import { NotificacionController } from './notificacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cliente } from 'src/modules/cliente/infraestructura/entities/cliente.entity';
import { SuscripcionNotificacion } from './entities/suscripcionNotificacion.entity';
import { ClienteModule } from 'src/modules/cliente/infraestructura/cliente.module';
import { AuthModule } from 'src/auth/auth.module';
import { ApiRestNotificacionesRepository } from './ApiRestNotificacionesRepository';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { OneSignalModule } from 'nestjs-onesignal';
import { SuscribirDispositivo } from '../dominio/casosDeUso/SuscribirDispositivo';
import { DesuscribirDispositivo } from '../dominio/casosDeUso/DesuscribirDispositivo';
import { MandarNotificacion } from '../dominio/casosDeUso/MandarNotificacion';

@Module({
  imports: [
    TypeOrmModule.forFeature([SuscripcionNotificacion, Cliente]),
    forwardRef(() => AuthModule),
    NotificacionModule,
    ClienteModule,
    ConfigModule,
    OneSignalModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        appId: config.get<string>('ONESIGNAL_APP_ID')!,
        apiKey: config.get<string>('ONESIGNAL_APP_KEY')!,
      }),
      inject: [ConfigService],
    }),
  ],
  controllers: [NotificacionController],
  providers: [
    NotificacionService,
    ApiRestNotificacionesRepository,
    SuscribirDispositivo,
    DesuscribirDispositivo,
    MandarNotificacion,
  ],
  exports: [
    NotificacionService,
    ApiRestNotificacionesRepository,
    SuscribirDispositivo,
    DesuscribirDispositivo,
    MandarNotificacion,
  ],
})
export class NotificacionModule {}
