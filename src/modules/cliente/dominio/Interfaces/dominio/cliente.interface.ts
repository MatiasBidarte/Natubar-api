export interface ClienteInterface {
  id: number;
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
  nombreContacto?: string;
  rut?: string;
  nombreEmpresa?: string;
}
