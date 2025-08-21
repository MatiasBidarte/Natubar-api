// src/modules/reportes/dominio/casosDeUso/GenerarReporteEntregas.ts
import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ReporteRepository } from '../interfaces/ReporteRepository';
import { ApiRestReportesRepository } from '../../infraestructura/repository/ApiRestReportesRepository';

@Injectable()
export class GenerarReporteEntregas {
  constructor(
    @Inject(forwardRef(() => ApiRestReportesRepository))
    private readonly reporteRepository: ReporteRepository,
  ) {}

  async ejecutar(): Promise<Buffer> {
    return await this.reporteRepository.generarReporteEntregas();
  }
}
