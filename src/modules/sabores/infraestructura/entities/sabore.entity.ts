import { Producto } from 'src/modules/productos/infraestructura/entities/producto.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToMany } from 'typeorm';

@Entity()
export class Sabor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @ManyToMany(() => Producto, (producto) => producto.sabores)
  productos: Producto[];

  constructor(id: number, nombre: string, productos: Producto[]) {
    this.id = id;
    this.nombre = nombre;
    this.productos = productos;
  }
}
