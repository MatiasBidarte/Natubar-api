import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { ClienteInterface } from '../cliente.interface';
import { Column, Entity, PrimaryColumn, TableInheritance, BeforeInsert, BeforeUpdate } from 'typeorm';
import * as bcrypt from 'bcrypt';

@Entity({ name: 'cliente' })
@TableInheritance({ column: { type: 'varchar', name: 'tipo' } })
export class Cliente implements ClienteInterface {
  @PrimaryColumn()
  @IsNotEmpty()
  @IsString()
  @IsEmail()
  email: string;

  //MANEJO DE LA CONTRASEÑA CON HASHEO
  @IsNotEmpty()
  @Column({ select: false })
  contrasena: string;

  @BeforeInsert()
  @BeforeUpdate()
  async hashContrasena() {
    if (this.contrasena) {
      //10 son las rondas de hasheo, es un número arbitrario
      this.contrasena = await bcrypt.hash(this.contrasena, 10);
    }
  }

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
  @IsPhoneNumber('UY')
  telefono: string;

  discriminador: string;

  @Column({nullable: true})
  nombre: string;

  @Column({nullable: true})
  apellido: string;

  @Column({nullable: true})
  nombreempresa: string;

  @Column({ name: 'rut' , nullable: true})
  RUT: string;

  @Column({nullable: true})
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
}
