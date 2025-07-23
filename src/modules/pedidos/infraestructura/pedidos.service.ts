import { EstadosPago, EstadosPedido, Pedido } from './entities/pedido.entity';
import { DetallePedido } from './entities/detalle-pedido.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ProductoSabor } from 'src/modules/productos/infraestructura/entities/producto-sabor.entity';

export class PedidosService {
  constructor(
    @InjectRepository(Pedido)
    private readonly pedidoRepository: Repository<Pedido>,

    @InjectRepository(DetallePedido)
    private detallePedidoRepository: Repository<DetallePedido>,

    @InjectRepository(ProductoSabor)
    private productoSaborRepository: Repository<ProductoSabor>,
  ) {}

  obtenerPedidos() {
    return [];
  }

  getByEstado(estado: EstadosPedido): Promise<Pedido[]> {
    return this.pedidoRepository.find({
      where: { estado },
      relations: [
        'productos',
        'productos.productoSabores',
        'productos.productoSabores.sabor',
      ],
      order: {
        fechaCreacion: 'DESC',
      },
    });
  }
  async crearPedido(pedido: Pedido): Promise<Pedido> {
    const pedidoEntity = this.pedidoRepository.create(pedido);
    await this.pedidoRepository.save(pedidoEntity);
    return pedidoEntity;
  }

  async confirmarPedido(pedidoId: string): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOneBy({
      id: Number(pedidoId),
    });
    if (!pedido) {
      throw new Error('Pedido no encontrado');
    }
    pedido.estadoPago = EstadosPago.pagado;
    return this.pedidoRepository.save(pedido);
  }

  async cambiarEstado(id: number, estado: EstadosPedido): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
    });
    if (!pedido) {
      throw new Error('Pedido no encontrado');
    }
    pedido.estado = estado;
    return await this.pedidoRepository.save(pedido);
  }

  async cambiarEstadoPago(id: number, estado: EstadosPago): Promise<Pedido> {
    const pedido = await this.pedidoRepository.findOne({
      where: { id },
    });
    if (!pedido) {
      throw new Error('Pedido no encontrado');
    }
    pedido.estadoPago = estado;
    return await this.pedidoRepository.save(pedido);
  }

  async guardarDetallePedido(detalle: DetallePedido): Promise<DetallePedido> {
    return this.detallePedidoRepository.save(detalle);
  }

  async guardarProductoSabor(
    productoSabor: ProductoSabor,
  ): Promise<ProductoSabor> {
    return this.productoSaborRepository.save(productoSabor);
  }
}
