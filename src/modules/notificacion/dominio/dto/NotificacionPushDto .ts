import { Cliente } from 'src/modules/cliente/infraestructura/entities/cliente.entity';

export class NotificacionPushDto {
  playersId?: string[];
  clienteId?: number;
  cliente?: Cliente;
  tipoCliente?: string;
  fecha?: Date;
  dispositivo?: string;
  cabezal: string;
  mensaje: string;
}

export interface OneSignalPayload {
  app_id: string | undefined;
  target_channel: string;
  headings: { en: string };
  contents: { en: string };
  filters?: Array<any>;
  send_after?: string;
  included_segments?: string[];
}
