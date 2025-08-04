import { obtenerProximoMartesoJueves } from 'src/utils/obtenerProximoMartesOJueves';
import {
  EstadosPedido,
  Pedido,
} from '../../infraestructura/entities/pedido.entity';
import { PedidoDto } from '../dto/pedido.dto';
import { Cliente } from 'src/modules/cliente/infraestructura/entities/cliente.entity';

export class PedidoMapper {
  static toDto(pedido: Pedido): PedidoDto {
    return new PedidoDto(
      pedido.id,
      pedido.fechaCreacion,
      pedido.fechaEntrega,
      pedido.fechaEntregaEstimada,
      pedido.montoTotal,
      pedido.descuento,
    );
  }
  static toInfra(raw: PedidoDto): Pedido {
    const pedido = new Pedido(
      raw.id,
      raw.fechaEntrega,
      raw.fechaEntregaEstimada,
      raw.montoTotal,
      raw.descuento,
      undefined,
    );
    return pedido;
  }

  static createFromDto(raw: PedidoDto, cliente: Cliente): Pedido {
    const fechaEntregaEstimada = obtenerProximoMartesoJueves();
    const pedido = new Pedido(
      undefined,
      undefined,
      fechaEntregaEstimada,
      raw.montoTotal,
      undefined,
      cliente,
    );
    pedido.estado = EstadosPedido.enPreparacion;
    return pedido;
  }
}
