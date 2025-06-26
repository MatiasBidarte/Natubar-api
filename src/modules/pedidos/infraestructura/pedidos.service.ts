import { Pedido } from './entities/pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,
  ) {}

  obtenerPedidos() {
    return [];
  }

  async crearPedido(pedido: Pedido): Promise<Pedido> {
    const pedidoEntity = this.pedidoRepository.create(pedido);
    await this.pedidoRepository.save(pedidoEntity);
    return pedidoEntity;
  }

  async confirmarPedido(preferenceId: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { preferenceId },
    });
    if (!pedido) {
      throw new Error('Pedido no encontrado');
    }
    pedido.estado = 'pagado';
    return this.pedidoRepository.save(pedido);
  }
}
