import { Cliente } from '../../infraestructura/entities/cliente.entity';
import { CreateClienteDto } from '../dto/crear-cliente.dto';
export class ClienteMapper {
  static toDomain(raw: CreateClienteDto): Cliente {
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

  static toPersistence(cliente: Cliente): any {
    return {
      email: cliente.email,
      contrasena: cliente.contrasena,
      observaciones: cliente.observaciones,
      departamento: cliente.departamento,
      ciudad: cliente.ciudad,
      direccion: cliente.direccion,
      telefono: cliente.telefono,
    };
  }
}
