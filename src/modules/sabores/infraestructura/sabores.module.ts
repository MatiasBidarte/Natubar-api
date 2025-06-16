import { Module } from '@nestjs/common';
import { SaboresController } from './sabores.controller';
import { SaboresService } from './sabores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Sabor } from './entities/sabore.entity';
import { ApiRestSaboresRepository } from './ApiRestSaboresRepository';
import { ObtenerSabores } from '../dominio/casosDeUso/ObtenerSabores';
import { AltaSabor } from '../dominio/casosDeUso/AltaSabor';

@Module({
  imports: [TypeOrmModule.forFeature([Sabor])],
  controllers: [SaboresController],
  providers: [
    SaboresService,
    ApiRestSaboresRepository,
    ObtenerSabores,
    AltaSabor,
  ],
  exports: [
    SaboresService,
    ApiRestSaboresRepository,
    ObtenerSabores,
    AltaSabor,
  ],
})
export class SaboresModule {}
