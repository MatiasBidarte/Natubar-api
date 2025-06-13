import { IsNotEmpty, IsString } from 'class-validator';
import { Cliente } from 'src/modules/cliente/infraestructura/entities/cliente.entity';
import { ChildEntity, Column } from 'typeorm';

@ChildEntity('Empresa')
export class ClienteEmpresa extends Cliente {
  @Column()
  @IsNotEmpty()
  @IsString()
  nombreEmpresa: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  rut: string;

  @Column()
  @IsNotEmpty()
  @IsString()
  nombreContacto: string;

  static readonly tipo = 'Empresa';

  constructor(
    email: string,
    contrasena: string,
    observaciones: string,
    departamento: string,
    ciudad: string,
    direccion: string,
    telefono: string,
    nombreContacto: string,
    rut: string,
    nombreEmpresa: string,
  ) {
    super(
      email,
      contrasena,
      observaciones,
      departamento,
      ciudad,
      direccion,
      telefono,
    );
    this.nombreEmpresa = nombreEmpresa;
    this.rut = rut;
    this.nombreContacto = nombreContacto;
  }
}
