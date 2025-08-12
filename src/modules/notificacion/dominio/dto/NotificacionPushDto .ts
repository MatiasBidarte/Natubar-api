import { Cliente } from 'src/modules/cliente/infraestructura/entities/cliente.entity';

export class NotificacionPushDto {
  playersId: string[];
  clienteId: number;
  cliente?: Cliente;
  dispositivo?: string;
  cabezal: string;
  mensaje: string;
}
