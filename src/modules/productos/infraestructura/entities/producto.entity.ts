import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { DetallePedido } from 'src/modules/pedidos/infraestructura/entities/detalle-pedido.entity';

@Entity({ name: 'productos' })
export class Producto {
  @PrimaryColumn()
  @IsNotEmpty()
  @IsNumber()
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

  @Column()
  @IsNotEmpty()
  @IsBoolean()
  stock: boolean;

  @Column({ nullable: true })
  esCajaDeBarras: boolean;

  @Column({ nullable: true })
  @IsNumber()
  cantidadDeBarras: number;

  @Column({ nullable: true })
  peso: number;

  @Column()
  costoProduccion: number;

  @Column()
  @IsString()
  urlImagen?: string;

  @OneToMany(() => DetallePedido, (detallePedido) => detallePedido.producto)
  productos: DetallePedido[];

  constructor(
    id: number,
    nombre: string,
    descripcion: string,
    precioPersonas: number,
    precioEmpresas: number,
    stock: boolean,
    urlImagen: string,
  ) {
    this.id = id;
    this.nombre = nombre;
    this.descripcion = descripcion;
    this.precioPersonas = precioPersonas;
    this.precioEmpresas = precioEmpresas;
    this.stock = stock;
    this.urlImagen = urlImagen;
  }
}
