import { ProductoDto } from 'src/modules/productos/dominio/dto/producto.dto';

export class DetallePedidoDto {
  id: number;
  cantidad: number;
  producto: ProductoDto;

  constructor(id: number, cantidad: number, producto: ProductoDto) {
    this.id = id;
    this.cantidad = cantidad;
    this.producto = producto;
  }
}
