import { IsEnum } from 'class-validator';
import { EstadosPedido } from '../../infraestructura/entities/pedido.entity';
import { DetallePedidoDto } from './detalle-pedido.dto';
import { ClienteDto } from 'src/modules/cliente/dominio/dto/cliente.dto';

export class EstadoDto {
  @IsEnum(EstadosPedido)
  estado: EstadosPedido;
}

export class PedidoDto {
  id: number;
  fechaCreacion: Date;
  fechaEntrega: Date;
  fechaEntregaEstimada: Date;
  montoTotal: number;
  descuento: number;
  preferenceId?: string;
  estado: EstadosPedido;
  productos: DetallePedidoDto[];
  cliente: ClienteDto;
  constructor(
    id: number,
    fechaCreacion: Date,
    fechaEntrega: Date,
    fechaEntregaEstimada: Date,
    montoTotal: number,
    descuento: number,
    estado: EstadosPedido = EstadosPedido.enPreparacion,
    productos: DetallePedidoDto[],
  ) {
    this.id = id;
    this.fechaCreacion = fechaCreacion;
    this.fechaEntrega = fechaEntrega;
    this.fechaEntregaEstimada = fechaEntregaEstimada;
    this.montoTotal = montoTotal;
    this.estado = estado;
    this.descuento = descuento;
    this.productos = productos;
  }
}
