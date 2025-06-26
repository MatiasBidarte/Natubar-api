export class ProductoDto {
  id: number;
  nombre: string;
  descripcion: string;
  precioPersonas: number;
  precioEmpresas: number;
  stock: boolean;
  urlImagen?: string;
  esCajaDeBarras: boolean;
  cantidadDeBarras: number;
  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    precioPersonas: number,
    precioEmpresas: number,
    stock: boolean,
    esCajaDeBarras: boolean,
    cantidadDeBarras: number,
    urlImagen?: string,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioPersonas = precioPersonas;
    this.precioEmpresas = precioEmpresas;
    this.stock = stock;
    this.urlImagen = urlImagen;
    this.esCajaDeBarras = esCajaDeBarras;
    this.cantidadDeBarras = cantidadDeBarras;
  }
}
