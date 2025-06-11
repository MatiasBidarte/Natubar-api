import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { PassportModule } from '@nestjs/passport';
import { join } from 'path';
import { ClienteModule } from 'src/modules/cliente/infraestructura/cliente.module';
//import { ClientePersonaModule } from './cliente-persona/cliente-persona.module';
//import { ClienteEmpresaModule } from './cliente-empresa/cliente-empresa.module';
import { ProductosModule } from 'src/modules/productos/infraestructura/productos.module';

@Module({
  imports: [
    ClienteModule,
    ProductosModule,
    ConfigModule.forRoot(),
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
        synchronize: true,
      }),
    }),
    //ClientePersonaModule,
    //ClienteEmpresaModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
