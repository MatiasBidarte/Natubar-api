export interface ReporteRepository {
  generarReporteEntregas(): Promise<Buffer>;
}
