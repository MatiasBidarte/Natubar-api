import { Cliente } from '../../infraestructura/entities/cliente.entity';
import { ClientePersona } from 'src/modules/cliente/infraestructura/entities/cliente-persona.entity';
import { ClienteEmpresa } from 'src/modules/cliente/infraestructura/entities/cliente-empresa.entity';
export class LoginRetornoClienteDto {
  access_token: string;

  email: string;

  observaciones: string;

  departamento: string;

  ciudad: string;

  direccion: string;

  telefono: string;

  discriminador: string;

  NombreEmpresa: string;
  RUT: string;
  NombreContacto: string;

  nombre: string;
  apellido: string;

  constructor(cliente: Cliente, access_token: string) {
    this.email = cliente.email;
    this.observaciones = cliente.observaciones;
    this.departamento = cliente.departamento;
    this.ciudad = cliente.ciudad;
    this.direccion = cliente.direccion;
    this.telefono = cliente.telefono;
    this.access_token = access_token;
    //this.NombreEmpresa = cliente.nombreempresa;
    //this.RUT = cliente.RUT;
    //this.NombreContacto = cliente.nombrecontacto;
    //this.nombre = cliente.nombre;
    //this.apellido = cliente.apellido;
  }
}
