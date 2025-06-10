import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { join } from 'path';
import { ClienteModule } from './cliente/infraestructura/cliente.module';
import { ClientePersonaModule } from './cliente-persona/cliente-persona.module';
import { ClienteEmpresaModule } from './cliente-empresa/cliente-empresa.module';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ClienteModule,
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        ClienteModule,
        //PassportModule.register({ defaultStrategy: 'jwt' }),
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('DB_HOST'),
        port: configService.get('DB_PORT'), // Convertir el puerto a número
        database: configService.get('DB_NAME'), // Sin comillas adicionales
        username: configService.get('DB_USERNAME'), // Sin comillas extra
        password: configService.get('DB_PASSWORD'), // Sin comas
        entities: [join(process.cwd(), 'dist', '**', '*.entity{.ts,.js}')],
        synchronize: true,
      }),
    }),
    ClientePersonaModule,
    ClienteEmpresaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
