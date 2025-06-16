import { Column, Entity, JoinTable, ManyToMany, PrimaryColumn } from 'typeorm';
import { IsBoolean, IsNotEmpty, IsNumber, IsString } from 'class-validator';
import { Sabor } from 'src/modules/sabores/infraestructura/entities/sabore.entity';
//entidad productos
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

  @Column({ name: 'urlimagen' })
  @IsString()
  urlImagen?: string;

  @ManyToMany(() => Sabor)
  @JoinTable()
  sabores: Sabor[];

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
