import { Cliente } from 'src/modules/cliente/infraestructura/entities/cliente.entity';
import { CrearClienteResponseDto } from '../../dto/crear-cliente.dto';
import { ActualizarClienteDto } from '../../dto/actualizar-cliente.dto';

export interface ClienteRepository {
  obtenerTodos(): Cliente[] | PromiseLike<Cliente[]>;
  alta(cliente: Cliente): Promise<CrearClienteResponseDto>;
  actualizar(
    id: number,
    clienteDto: ActualizarClienteDto,
  ): Promise<{ cliente: Partial<Cliente>; access_token: string }>;
}
