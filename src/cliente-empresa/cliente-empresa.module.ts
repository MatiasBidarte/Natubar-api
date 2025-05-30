import { Module } from '@nestjs/common';
import { ClienteEmpresaService } from './cliente-empresa.service';
import { ClienteEmpresaController } from './cliente-empresa.controller';

@Module({
  controllers: [ClienteEmpresaController],
  providers: [ClienteEmpresaService],
})
export class ClienteEmpresaModule {}
