import { Cliente } from 'src/modules/cliente/infraestructura/entities/cliente.entity';
import { CrearClienteResponseDto } from '../../dto/crear-cliente.dto';

export interface ClienteRepository {
  obtenerTodos(): Cliente[] | PromiseLike<Cliente[]>;
  alta(cliente: Cliente): Promise<CrearClienteResponseDto>;
}
