import { Module } from '@nestjs/common';
import { ClientePersonaService } from './cliente-persona.service';
import { ClientePersonaController } from './cliente-persona.controller';

@Module({
  controllers: [ClientePersonaController],
  providers: [ClientePersonaService],
})
export class ClientePersonaModule {}
