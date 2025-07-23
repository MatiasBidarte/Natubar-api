import { Cliente } from 'src/modules/cliente/infraestructura/entities/cliente.entity';

export class SuscripcionNotificacion {
  playerId: string;
  clienteId: number;
  cliente?: Cliente;
  dispositivo: string;
  cabezal: string;
  mensaje: string;
}
