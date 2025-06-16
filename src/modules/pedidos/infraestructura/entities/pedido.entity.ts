import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { DetallePedido } from './detalle-pedido.entity';

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

  @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.pedido)
  detallesPedidos: DetallePedido[];
}
