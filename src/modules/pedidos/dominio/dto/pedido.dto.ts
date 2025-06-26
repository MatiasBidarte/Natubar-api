import { ClienteDto } from 'src/modules/cliente/dominio/dto/cliente.dto';
import { DetallePedidoDto } from './detalle-pedido.dto';

export class PedidoDto {
  id: number;
  fechaEntrega: Date;
  fechaEntregaEstimada: Date;
  montoTotal: number;
  descuento: number;
  detalleProductos?: DetallePedidoDto[];
  cliente?: ClienteDto;
  preferenceId?: string;

  constructor(
    id: number,
    fechaEntrega: Date,
    fechaEntregaEstimada: Date,
    montoTotal: number,
    descuento: number,
    productos?: DetallePedidoDto[],
    cliente?: ClienteDto,
    preferenceId?: string,
  ) {
    this.id = id;
    this.fechaEntrega = fechaEntrega;
    this.fechaEntregaEstimada = fechaEntregaEstimada;
    this.montoTotal = montoTotal;
    this.descuento = descuento;
    this.detalleProductos = productos;
    this.cliente = cliente;
    this.preferenceId = preferenceId || '';
  }
}
