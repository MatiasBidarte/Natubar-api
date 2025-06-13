export class CreateClienteDto {
  email: string;
  contrasena: string;
  observaciones: string;
  departamento: string;
  ciudad: string;
  direccion: string;
  telefono: string;
  tipo: string;
  nombre?: string;
  apellido?: string;
  nombreEmpresa?: string;
  rut?: string;
  nombreContacto?: string;

  constructor(
    email: string,
    contrasena: string,
    observaciones: string,
    departamento: string,
    ciudad: string,
    direccion: string,
    tipo: string,
    telefono: string,
    nombre?: string,
    apellido?: string,
    nombreEmpresa?: string,
    rut?: string,
    nombreContacto?: string,
  ) {
    this.email = email;
    this.contrasena = contrasena;
    this.observaciones = observaciones;
    this.departamento = departamento;
    this.ciudad = ciudad;
    this.direccion = direccion;
    this.tipo = tipo;
    this.telefono = telefono;
    this.nombre = nombre;
    this.apellido = apellido;
    this.nombreEmpresa = nombreEmpresa;
    this.rut = rut;
    this.nombreContacto = nombreContacto;
  }
}

export interface CrearClienteResponseDto {
  access_token: string;
}
