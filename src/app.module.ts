import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { join } from 'path';
import { ClienteModule } from 'src/modules/cliente/infraestructura/cliente.module';
import { ProductosModule } from 'src/modules/productos/infraestructura/productos.module';
import { SaboresModule } from './modules/sabores/infraestructura/sabores.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [
    ClienteModule,
    ProductosModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule, ClienteModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PGHOST'),
        port: configService.get('PGPORT'), // Convertir el puerto a número
        database: configService.get('PGDATABASE'), // Sin comillas adicionales
        username: configService.get('PGUSER'), // Sin comillas extra
        password: configService.get('PGPASSWORD'), // Sin comas
        entities: [join(process.cwd(), 'dist', '**', '*.entity{.ts,.js}')],
        synchronize: configService.get('ENV') === 'dev' ? true : false,
      }),
    }),
    SaboresModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
