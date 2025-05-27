import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';

import { join } from 'path';
import { ClienteModule } from './cliente/cliente.module';
import { ClienteController } from './cliente/cliente.controller';
import { ClienteService } from './cliente/cliente.service';
import { Cliente } from './cliente/entities/cliente.entity';

@Module({
  
  imports: [
    ClienteModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule,ClienteModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'), // Convertir el puerto a número
        database: configService.get('DB_NAME'), // Sin comillas adicionales
        username: configService.get('DB_USER'), // Sin comillas extra
        password: configService.get('DB_PASSWORD'), // Sin comas
        entities: [join(process.cwd(), 'dist', '**', '*.entity{.ts,.js}')],
      })
    }),],
  controllers: [AppController],
  providers: [AppService],


})
export class AppModule { }
