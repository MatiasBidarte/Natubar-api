export class SaborDto {
  id: number;
  nombre: string;
  productos: number[];

  constructor(id: number, nombre: string, productos: number[]) {
    this.id = id;
    this.nombre = nombre;
    this.productos = productos;
  }
  toPrimitives() {
    return {
      id: this.id,
      nombre: this.nombre,
      productos: this.productos,
    };
  }
}
