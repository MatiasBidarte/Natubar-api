import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { ClienteInterface } from '../../dominio/Interfaces/dominio/cliente.interface';
import { Column, Entity, PrimaryColumn, TableInheritance } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'cliente' })
@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
export class Cliente implements ClienteInterface {
  @PrimaryColumn()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  @MinLength(8)
  contrasena: string;

  @Column()
  @IsString()
  observaciones: string;

  @Column()
  @IsNotEmpty()
  departamento: string;

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

  discriminador: string;

  @Column()
  nombre: string;

  @Column()
  apellido: string;

  @Column()
  nombreempresa: string;

  @Column({ name: 'rut' })
  RUT: string;

  @Column()
  nombrecontacto: string;

  @Column({ type: 'varchar' })
  tipo: string;

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
