// src/modules/reportes/infraestructura/reportes.module.ts
import { Module } from '@nestjs/common';
import { ReportesController } from './reportes.controller';
import { GenerarReporteEntregas } from '../dominio/casosDeUso/GenerarReporteEntregas';
import { PedidosModule } from '../../pedidos/infraestructura/pedidos.module';
import { ApiRestReportesRepository } from './repository/ApiRestReportesRepository';

@Module({
  imports: [PedidosModule],
  controllers: [ReportesController],
  providers: [ApiRestReportesRepository, GenerarReporteEntregas],
  exports: [ApiRestReportesRepository, GenerarReporteEntregas],
})
export class ReportesModule {}
