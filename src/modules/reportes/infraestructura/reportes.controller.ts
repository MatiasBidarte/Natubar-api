import { Controller, Get, Res } from '@nestjs/common';
import { Response } from 'express';
import { GenerarReporteEntregas } from '../dominio/casosDeUso/GenerarReporteEntregas';

@Controller('reportes')
export class ReportesController {
  constructor(
    private readonly _generarReporteEntregas: GenerarReporteEntregas,
  ) {}

  @Get('entregas')
  async generarReporteEntregas(@Res() res: Response) {
    try {
      const buffer = await this._generarReporteEntregas.ejecutar();

      res.end(buffer);
    } catch (error) {
      console.error('Error al generar el reporte de entregas:', error);
      res.status(500).send('Error al generar el reporte');
    }
  }
}
