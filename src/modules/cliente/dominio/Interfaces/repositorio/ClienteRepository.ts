import { Cliente } from 'src/modules/cliente/infraestructura/entities/cliente.entity';
import { CrearClienteResponseDto } from '../../dto/cliente.dto';
import { ActualizarClienteDto } from '../../dto/actualizar-cliente.dto';
import { PedidoDto } from 'src/modules/pedidos/dominio/dto/pedido.dto';

export interface ClienteRepository {
  obtenerTodos(): Cliente[] | PromiseLike<Cliente[]>;
  alta(cliente: Cliente): Promise<CrearClienteResponseDto>;
  actualizar(
    id: number,
    clienteDto: ActualizarClienteDto,
  ): Promise<{ cliente: Partial<Cliente>; access_token: string }>;
  pedidosPorCliente(id: number): Promise<PedidoDto[]>;
  obtenerPorId(id: number): Promise<Cliente | null>;
}
