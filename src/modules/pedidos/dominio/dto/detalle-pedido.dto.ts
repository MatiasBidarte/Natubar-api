import { SaborDto } from 'src/modules/sabores/dominio/dto/sabor.dto';

export class DetallePedidoDto {
  cantidad: number;
  id: number;
  nombre: string;
  descripcion: string;
  precioPersonas: number;
  precioEmpresas: number;
  stock: boolean;
  urlImagen?: string;
  peso?: number;
  esCajaDeBarras: boolean;
  cantidadDeBarras?: number;
  sabores: SaborDto[];

  constructor(cantidad: number) {
    this.cantidad = cantidad;
  }
}
