import { Module } from '@nestjs/common';
import { SaboresController } from './sabores.controller';
import { SaboresService } from './sabores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sabor } from './entities/sabor.entity';
import { ApiRestSaboresRepository } from './ApiRestSaboresRepository';
import { ObtenerSabores } from '../dominio/casosDeUso/ObtenerSabores';

@Module({
  imports: [TypeOrmModule.forFeature([Sabor])],
  controllers: [SaboresController],
  providers: [SaboresService, ApiRestSaboresRepository, ObtenerSabores],
  exports: [SaboresService, ApiRestSaboresRepository, ObtenerSabores],
})
export class SaboresModule {}
