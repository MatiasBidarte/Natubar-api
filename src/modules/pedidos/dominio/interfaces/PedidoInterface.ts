import { ClienteInterface } from 'src/modules/cliente/dominio/Interfaces/dominio/cliente.interface';
import { ProductoInterface } from 'src/modules/productos/dominio/interfaces/ProductoInterface';

export interface PedidoInterface {
  id: number;
  fechaEntrega: Date;
  fechaEntregaEstimada: Date;
  montoTotal: number;
  descuento: number;
  productos: ProductoInterface[];
  cliente: ClienteInterface;
}
