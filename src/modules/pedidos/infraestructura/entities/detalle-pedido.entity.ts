import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Pedido } from './pedido.entity';
import { Producto } from 'src/modules/productos/infraestructura/entities/producto.entity';
import { ProductoSabor } from 'src/modules/productos/infraestructura/entities/producto-sabor.entity';

@Entity({ name: 'detalles_pedidos' })
export class DetallePedido {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Pedido, (pedido) => pedido.detallesPedidos)
  pedido: Pedido;

  @ManyToOne(() => Producto, (producto) => producto.detallesPedidos, {
    eager: true,
  })
  producto: Producto;

  @OneToMany(
    () => ProductoSabor,
    (productoSabor) => productoSabor.detallePedido,
    {
      eager: true,
    },
  )
  productoSabores: ProductoSabor[];

  @Column()
  cantidad: number;
}
