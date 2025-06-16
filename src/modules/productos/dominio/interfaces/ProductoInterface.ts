import { SaborInterface } from 'src/modules/sabores/dominio/interfaces/SaborInterface';

export interface ProductoInterface {
  id: number;
  nombre: string;
  descripcion: string;
  precioPersonas: number;
  precioEmpresas: number;
  stock: boolean;
  urlImagen?: string;
  sabores: SaborInterface[];
}
