import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { DetallePedido } from './detalle-pedido.entity';
import { Cliente } from 'src/modules/cliente/infraestructura/entities/cliente.entity';

@Entity({ name: 'pedidos' })
export class Pedido {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  fechaEntrega: Date;

  @Column()
  fechaEntregaEstimada: Date;

  @Column()
  montoTotal: number;

  @Column()
  descuento: number;

  @Column({ nullable: true })
  preferenceId: string;

  @Column({ nullable: true })
  estado: string;

  @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.pedido, {
    eager: true,
    cascade: true,
  })
  detallesPedidos: DetallePedido[];

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos, { eager: true })
  cliente: Cliente;

  constructor(
    id?: number,
    fechaEntrega?: Date,
    fechaEntregaEstimada?: Date,
    montoTotal?: number,
    descuento?: number,
    cliente?: Cliente,
    preferenceId?: string,
  ) {
    if (id !== undefined) this.id = id;
    if (fechaEntrega !== undefined) this.fechaEntrega = fechaEntrega;
    if (fechaEntregaEstimada !== undefined)
      this.fechaEntregaEstimada = fechaEntregaEstimada;
    if (montoTotal !== undefined) this.montoTotal = montoTotal;
    if (descuento !== undefined) this.descuento = descuento;
    if (preferenceId !== undefined) this.preferenceId = preferenceId;
    if (cliente !== undefined) this.cliente = cliente;
    this.estado = 'pendiente';
  }

  addDetallePedido(detallePedido: DetallePedido) {
    if (!this.detallesPedidos) {
      this.detallesPedidos = [];
    }
    this.detallesPedidos.push(detallePedido);
  }
}
