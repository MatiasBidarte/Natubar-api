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

  @Column()
  descuento: number;

  @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.pedido, {
    eager: true,
  })
  detallesPedidos: DetallePedido[];

  @ManyToOne(() => Cliente, (cliente) => cliente.pedidos, { eager: true })
  cliente: Cliente;
}
