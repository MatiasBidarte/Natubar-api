import { ProductoSabor } from 'src/modules/productos/infraestructura/entities/producto-sabor.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Sabor {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nombre: string;

  @OneToMany(() => ProductoSabor, (productoSabor) => productoSabor.sabor, {
    eager: true,
  })
  productoSabores: ProductoSabor[];

  constructor(id: number, nombre: string) {
    this.id = id;
    this.nombre = nombre;
  }
}
