export class SaborDto {
  id: number;
  nombre: string;
  cantidad?: number;
  sabor?: SaborDto;

  constructor(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
  }
}
