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
import { PedidosModule } from './modules/pedidos/infraestructura/pedidos.module';
import { NotificacionModule } from './modules/notificacion/infraestructura/notificacion.module';

@Module({
  imports: [
    ClienteModule,
    ProductosModule,
    PedidosModule,
    NotificacionModule,
    AuthModule,
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRootAsync({
      imports: [
        ConfigModule,
        ClienteModule,
        PedidosModule,
        ProductosModule,
        NotificacionModule,
      ],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('PGHOST'),
        port: configService.get('PGPORT'),
        database: configService.get('PGDATABASE'),
        username: configService.get('PGUSER'),
        password: configService.get('PGPASSWORD'),
        entities: [join(process.cwd(), 'dist', '**', '*.entity{.ts,.js}')],
        synchronize: /* configService.get('ENV') === 'dev' */ true,
      }),
    }),
    SaboresModule,
    NotificacionModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
