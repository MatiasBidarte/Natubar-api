export class ProductoDto {
  id: number;
  nombre: string;
  descripcion: string;
  precioPersonas: number;
  precioEmpresas: number;
  stock: boolean;
  esCajaDeBarras: boolean;
  urlImagen?: string;
  peso?: number;
  cantidadDeBarras?: number;
  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    precioPersonas: number,
    precioEmpresas: number,
    stock: boolean,
    esCajaDeBarras: boolean,
    urlImagen?: string,
    peso?: number,
    
    cantidadDeBarras?: number,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioPersonas = precioPersonas;
    this.precioEmpresas = precioEmpresas;
    this.stock = stock;
    this.urlImagen = urlImagen;
    this.peso = peso;
    this.esCajaDeBarras = esCajaDeBarras;
    this.cantidadDeBarras = cantidadDeBarras;
  }
}
