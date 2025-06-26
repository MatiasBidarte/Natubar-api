export class SaborDto {
  id: number;
  nombre: string;
  cantidad?: number;

  constructor(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
  }
}
