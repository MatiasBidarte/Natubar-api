export class ProductoDto {
  id: number;
  nombre: string;
  descripcion: string;
  precioPersonas: number;
  precioEmpresas: number;
  esCajaDeBarras: boolean;
  costoProduccion: number;
  urlImagen?: string;
  cantidadDeBarras?: number;
  estaActivo?: boolean;
  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    precioPersonas: number,
    precioEmpresas: number,
    esCajaDeBarras: boolean,
    costoProduccion: number,
    urlImagen?: string,
    cantidadDeBarras?: number,
    estaActivo?: boolean,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioPersonas = precioPersonas;
    this.precioEmpresas = precioEmpresas;
    this.urlImagen = urlImagen;
    this.costoProduccion = costoProduccion;
    this.esCajaDeBarras = esCajaDeBarras;
    this.cantidadDeBarras = cantidadDeBarras;
    this.estaActivo = estaActivo;
  }
}
