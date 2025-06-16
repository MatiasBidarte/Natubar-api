import { ClientePersona } from '../../infraestructura/entities/cliente-persona.entity';
import { Cliente } from '../../infraestructura/entities/cliente.entity';
import { ClienteDto } from '../dto/cliente.dto';
export class ClienteMapper {
  static toDomain(raw: ClienteDto): Cliente {
    return new Cliente(
      raw.email,
      raw.contrasena,
      raw.observaciones,
      raw.departamento,
      raw.ciudad,
      raw.direccion,
      raw.telefono,
    );
  }

  static toDto(cliente: Cliente): ClienteDto {
    return {
      email: cliente.email,
      contrasena: cliente.contrasena,
      observaciones: cliente.observaciones,
      departamento: cliente.departamento,
      ciudad: cliente.ciudad,
      direccion: cliente.direccion,
      telefono: cliente.telefono,
      tipo: cliente instanceof ClientePersona ? 'Persona' : 'Empresa',
    };
  }
}
