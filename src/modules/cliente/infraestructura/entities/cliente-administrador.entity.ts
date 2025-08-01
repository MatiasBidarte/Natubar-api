import { Cliente } from 'src/modules/cliente/infraestructura/entities/cliente.entity';
import { ChildEntity } from 'typeorm';

@ChildEntity('Administrador')
export class ClienteAdministrador extends Cliente {
  static readonly tipo = 'Administrador';

  constructor(
    email: string,
    contrasena: string,
    observaciones: string,
    departamento: string,
    ciudad: string,
    direccion: string,
    telefono: string,
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
  }
}
