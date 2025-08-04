import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DetallePedido } from './detalle-pedido.entity';
import { Cliente } from 'src/modules/cliente/infraestructura/entities/cliente.entity';

export enum EstadosPedido {
  enPreparacion = 'En Preparación',
  enCamino = 'En Camino',
  entregado = 'Entregado',
  pendientePago = 'Pendiente de Pago',
}

export enum EstadosPago {
  pendiente = 'Pendiente pago',
  pagado = 'Pagado',
  cancelado = 'Pago rechazado',
}
@Entity({ name: 'pedidos' })
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  fechaEntrega: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  fechaCreacion: Date;

  @Column()
  fechaEntregaEstimada: Date;

  @Column()
  montoTotal: number;

  @Column()
  estado: EstadosPedido;

  @Column({ nullable: true })
  estadoPago: EstadosPago;

  @Column({ nullable: true })
  descuento: number;

  @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.pedido, {
    eager: true,
    cascade: true,
  })
  productos: DetallePedido[];

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos, { eager: true })
  cliente: Cliente;

  constructor(
    id?: number,
    fechaEntrega?: Date,
    fechaEntregaEstimada?: Date,
    montoTotal?: number,
    descuento?: number,
    cliente?: Cliente,
  ) {
    if (id !== undefined) this.id = id;
    if (fechaEntrega !== undefined) this.fechaEntrega = fechaEntrega;
    if (fechaEntregaEstimada !== undefined)
      this.fechaEntregaEstimada = fechaEntregaEstimada;
    if (montoTotal !== undefined) this.montoTotal = montoTotal;
    if (descuento !== undefined) this.descuento = descuento;
    if (cliente !== undefined) this.cliente = cliente;
    this.estado = EstadosPedido.pendientePago;
    this.estadoPago = EstadosPago.pendiente;
    this.fechaCreacion = new Date();
  }

  addDetallePedido(detallePedido: DetallePedido) {
    if (!this.productos) {
      this.productos = [];
    }
    this.productos.push(detallePedido);
  }
}
