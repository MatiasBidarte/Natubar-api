import { ProductoDto } from 'src/modules/productos/dominio/dto/producto.dto';
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
  producto?: ProductoDto;
  sabores: SaborDto[];

  constructor(cantidad: number) {
    this.cantidad = cantidad;
  }
}
