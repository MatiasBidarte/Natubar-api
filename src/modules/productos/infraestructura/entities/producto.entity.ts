import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { DetallePedido } from 'src/modules/pedidos/infraestructura/entities/detalle-pedido.entity';

@Entity({ name: 'productos' })
export class Producto {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  @IsNotEmpty()
  @IsString()
  nombre: string;

  @Column()
  @IsString()
  descripcion: string;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  precioPersonas: number;

  @Column()
  @IsNotEmpty()
  @IsNumber()
  precioEmpresas: number;

  @Column({ nullable: true })
  esCajaDeBarras: boolean;

  @Column({ nullable: true })
  @IsNumber()
  cantidadDeBarras: number;

  @Column()
  costoProduccion: number;

  @Column()
  @IsString()
  urlImagen?: string;

  @Column({ default: true })
  estaActivo: boolean;

  @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.producto)
  productos: DetallePedido[];

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    precioPersonas: number,
    precioEmpresas: number,
    urlImagen: string,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioPersonas = precioPersonas;
    this.precioEmpresas = precioEmpresas;
    this.urlImagen = urlImagen;
  }
}
