import { obtenerProximoMartesoJueves } from 'src/utils/obtenerProximoMartesOJueves';
import {
  EstadosPedido,
  Pedido,
} from '../../infraestructura/entities/pedido.entity';
import { PedidoDto } from '../dto/pedido.dto';
import { Cliente } from 'src/modules/cliente/infraestructura/entities/cliente.entity';
import { DetallePedidoMapper } from './detalle-pedido-mapper';
import { ClienteMapper } from 'src/modules/cliente/dominio/mapper/UsuarioMapper';

export class PedidoMapper {
  static toDto(pedido: Pedido): PedidoDto {
    const productosDto = pedido.productos
      ? pedido.productos.map((detalle) => DetallePedidoMapper.toDto(detalle))
      : [];

    const pedidoDto = new PedidoDto(
      pedido.id,
      pedido.fechaCreacion,
      pedido.fechaEntrega,
      pedido.fechaEntregaEstimada,
      pedido.montoTotal,
      pedido.descuento || 0,
      productosDto,
      pedido.estado,
      pedido.estadoPago,
      pedido.observaciones,
      ClienteMapper.toDto(pedido.cliente),
    );

    return pedidoDto;
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
      raw.observaciones,
    );
    pedido.estado = EstadosPedido.enPreparacion;
    return pedido;
  }
}
