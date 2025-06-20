import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { DetallePedido } from 'src/modules/pedidos/infraestructura/entities/detalle-pedido.entity';
import { Sabor } from 'src/modules/sabores/infraestructura/entities/sabor.entity';

@Entity({ name: 'productos_sabores' })
export class ProductoSabor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  cantidad: number;

  @ManyToOne(() => DetallePedido, (detalle) => detalle.productoSabores)
  detallePedido: DetallePedido;

  @ManyToOne(() => Sabor, (sabor) => sabor.productoSabores)
  sabor: Sabor;
}
