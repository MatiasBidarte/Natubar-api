export class ProductoDto {
  nombre: string;
  descripcion: string;
  precioPersonas: number;
  precioEmpresas: number;
  stock: boolean;
  urlImagen?: string;

  constructor(
    nombre: string,
    descripcion: string,
    precioPersonas: number,
    precioEmpresas: number,
    stock: boolean,
    urlImagen?: string,
  ) {
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioPersonas = precioPersonas;
    this.precioEmpresas = precioEmpresas;
    this.stock = stock;
    this.urlImagen = urlImagen;
  }

  toPrimitives() {
    return {
      nombre: this.nombre,
      descripcion: this.descripcion,
      precioPersonas: this.precioPersonas,
      precioEmpresas: this.precioEmpresas,
      stock: this.stock,
      urlImagen: this.urlImagen,
    };
  }
}
