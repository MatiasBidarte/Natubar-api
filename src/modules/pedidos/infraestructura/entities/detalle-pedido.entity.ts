import { Column, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Pedido } from './pedido.entity';
import { Producto } from 'src/modules/productos/infraestructura/entities/producto.entity';

export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.detallesPedidos)
  pedido: Pedido;

  @ManyToOne(() => Producto, (producto) => producto.detallesPedidos)
  producto: Producto;

  @Column()
  cantidad: number;

  @Column({ type: 'decimal', precision: 10, scale: 2 })
  precioUnitario: number;
}
