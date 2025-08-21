import { IsEnum } from 'class-validator';
import {
  EstadosPago,
  EstadosPedido,
} from '../../infraestructura/entities/pedido.entity';
import { DetallePedidoDto } from './detalle-pedido.dto';
import { ClienteDto } from 'src/modules/cliente/dominio/dto/cliente.dto';

export class EstadoDto {
  @IsEnum(EstadosPedido)
  estado: EstadosPedido;
}

export class PedidoDto {
  id?: number;
  fechaCreacion?: Date;
  fechaEntrega?: Date;
  fechaEntregaEstimada?: Date;
  montoTotal: number;
  descuento?: number;
  estado: EstadosPedido;
  estadoPago: EstadosPago;
  productos: DetallePedidoDto[];
  cliente?: ClienteDto;
  observaciones?: string;
  ultimoRecordatorioPago: Date;
  constructor(
    id: number,
    fechaCreacion: Date,
    fechaEntrega: Date,
    fechaEntregaEstimada: Date,
    montoTotal: number,
    descuento: number,
    productos: DetallePedidoDto[],
    estado: EstadosPedido,
    estadoPago: EstadosPago,
    observaciones?: string,
    cliente?: ClienteDto,
    ultimoRecordatorioPago?: Date,
  ) {
    this.id = id;
    this.fechaCreacion = fechaCreacion;
    this.fechaEntrega = fechaEntrega;
    this.fechaEntregaEstimada = fechaEntregaEstimada;
    this.montoTotal = montoTotal;
    this.estado = estado ?? EstadosPedido.enPreparacion;
    this.estadoPago = estadoPago ?? EstadosPago.pendiente;
    this.productos = productos;
    this.descuento = descuento;
    this.observaciones = observaciones;
    this.cliente = cliente;
    if (ultimoRecordatorioPago !== undefined)
      this.ultimoRecordatorioPago = ultimoRecordatorioPago;
  }
}
