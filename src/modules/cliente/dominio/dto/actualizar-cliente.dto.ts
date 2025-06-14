export class ActualizarClienteDto {
  observaciones?: string;
  departamento?: string;
  ciudad?: string;
  direccion?: string;
  telefono?: string;
  nombre?: string;
  apellido?: string;
  nombreEmpresa?: string;
  rut?: string;
  nombreContacto?: string;

  constructor(
    observaciones?: string,
    departamento?: string,
    ciudad?: string,
    direccion?: string,
    telefono?: string,
    nombre?: string,
    apellido?: string,
    nombreEmpresa?: string,
    rut?: string,
    nombreContacto?: string,
  ) {
    this.observaciones = observaciones;
    this.departamento = departamento;
    this.ciudad = ciudad;
    this.direccion = direccion;
    this.telefono = telefono;
    this.nombre = nombre;
    this.apellido = apellido;
    this.nombreEmpresa = nombreEmpresa;
    this.rut = rut;
    this.nombreContacto = nombreContacto;
  }
}
