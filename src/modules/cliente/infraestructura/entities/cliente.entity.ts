import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString } from 'class-validator';
import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  TableInheritance,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { Pedido } from 'src/modules/pedidos/infraestructura/entities/pedido.entity';

@Entity({ name: 'clientes' })
@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
export class Cliente {
  @PrimaryGeneratedColumn()
  id: number;

  @IsNotEmpty()
  @IsString()
  @IsEmail()
  @Column({ unique: true })
  email: string;

  @IsNotEmpty()
  @Column()
  contrasena: string;

  @Column({ nullable: true })
  @IsString()
  observaciones: string;

  @Column()
  @IsNotEmpty()
  departamento: string;

  @Column({ name: 'tipo' })
  tipo: string;

  @Column()
  @IsNotEmpty()
  ciudad: string;

  @Column()
  @IsNotEmpty()
  direccion: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @IsPhoneNumber('UY', { message: 'El teléfono debe ser un número válido' })
  telefono: string;

  @OneToMany(() => Pedido, (pedido) => pedido.cliente)
  pedidos: Pedido[];

  constructor(
    email: string,
    contrasena: string,
    observaciones: string,
    departamento: string,
    ciudad: string,
    direccion: string,
    telefono: string,
  ) {
    this.email = email;
    this.contrasena = contrasena;
    this.observaciones = observaciones;
    this.departamento = departamento;
    this.ciudad = ciudad;
    this.direccion = direccion;
    this.telefono = telefono;
  }

  async setPassword() {
    this.contrasena = await this.hashPass(this.contrasena);
  }

  async hashPass(p: string): Promise<string> {
    const saltOrRounds = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(p, saltOrRounds);
    return hash;
  }
}
