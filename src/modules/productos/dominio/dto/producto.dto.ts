import { SaborDto } from 'src/modules/sabores/dominio/dto/sabor.dto';

export class ProductoDto {
  id: number;
  nombre: string;
  descripcion: string;
  precioPersonas: number;
  precioEmpresas: number;
  stock: boolean;
  urlImagen?: string;
  sabores: SaborDto[];
  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    precioPersonas: number,
    precioEmpresas: number,
    stock: boolean,
    sabores: SaborDto[],
    urlImagen?: string,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioPersonas = precioPersonas;
    this.precioEmpresas = precioEmpresas;
    this.stock = stock;
    this.sabores = sabores;
    this.urlImagen = urlImagen;
  }

  toPrimitives() {
    return {
      id: this.id,
      nombre: this.nombre,
      descripcion: this.descripcion,
      precioPersonas: this.precioPersonas,
      precioEmpresas: this.precioEmpresas,
      stock: this.stock,
      urlImagen: this.urlImagen,
      sabores: this.sabores,
    };
  }
}
