export class CrearActualizarProductoDto {
  nombre: string;
  descripcion: string;
  precioPersonas: number;
  precioEmpresas: number;
  esCajaDeBarras: boolean;
  costoProduccion: number;
  urlImagen?: string;
  cantidadDeBarras?: number;
  estaActivo?: boolean;
}
