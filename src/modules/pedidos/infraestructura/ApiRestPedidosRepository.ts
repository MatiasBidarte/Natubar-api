import {
  forwardRef,
  Inject,
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { PedidoRepository } from '../dominio/interfaces/repositorio/PedidoRepository';
import { PedidosService } from './pedidos.service';
import { PedidoDto } from '../dominio/dto/pedido.dto';
import { EstadosPago, EstadosPedido, Pedido } from './entities/pedido.entity';
import { ClienteService } from 'src/modules/cliente/infraestructura/cliente.service';
import { ProductosService } from 'src/modules/productos/infraestructura/productos.service';
import { PedidoMapper } from '../dominio/mappers/pedido-mapper';
import { DetallePedidoMapper } from '../dominio/mappers/detalle-pedido-mapper';
import { ProductoSabor } from 'src/modules/productos/infraestructura/entities/producto-sabor.entity';
import { SaboresRepository } from 'src/modules/sabores/dominio/interfaces/SaboresRepository';
import { ApiRestSaboresRepository } from 'src/modules/sabores/infraestructura/ApiRestSaboresRepository';
import { ApiRestNotificacionesRepository } from 'src/modules/notificacion/infraestructura/ApiRestNotificacionesRepository';
import { construirMensajeEstado } from 'src/modules/notificacion/dominio/utils/construirMensajeEstado';

@Injectable()
export class ApiRestPedidosRepository implements PedidoRepository {
  constructor(
    @Inject(forwardRef(() => PedidosService))
    private readonly contextPedido: PedidosService,
    @Inject(forwardRef(() => ClienteService))
    private readonly contextCliente: ClienteService,
    @Inject(forwardRef(() => ProductosService))
    private readonly contextProducto: ProductosService,

    @Inject(forwardRef(() => ApiRestSaboresRepository))
    private readonly saboresRepository: SaboresRepository,
    @Inject(forwardRef(() => ApiRestNotificacionesRepository))
    private readonly notificacionesRepository: ApiRestNotificacionesRepository,
  ) {}
  async getByEstado(estado: EstadosPedido): Promise<PedidoDto[]> {
    const pedidos = await this.contextPedido.getByEstado(estado);
    return pedidos.map((pedido) => PedidoMapper.toDto(pedido));
  }

  async obtenerTodos(): Promise<PedidoDto[]> {
    const pedidos = await this.contextPedido.obtenerPedidos();
    return pedidos.map((pedido) => PedidoMapper.toDto(pedido));
  }

  async findById(id: number): Promise<PedidoDto> {
    const pedido = await this.contextPedido.findById(id);
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    return PedidoMapper.toDto(pedido);
  }
  async crearPedido(pedidoDto: PedidoDto): Promise<{ id: number }> {
    if (!pedidoDto.cliente?.id) {
      throw new BadRequestException('El id del cliente es requerido');
    }

    const cliente = await this.contextCliente.findById(pedidoDto.cliente.id);
    if (!cliente) {
      throw new NotFoundException('Cliente no encontrado');
    }
    const pedido = PedidoMapper.createFromDto(pedidoDto, cliente);
    console.log('pedido en repository', pedido);

    if (!pedidoDto.productos || pedidoDto.productos.length === 0) {
      throw new BadRequestException(
        'La lista de detalleProductos es requerida y no puede estar vacía',
      );
    }

    const pedidoGuardado = await this.contextPedido.crearPedido(pedido);
    const sabores = await this.saboresRepository.obtenerTodos();

    for (const detalleDto of pedidoDto.productos) {
      const producto = await this.contextProducto.findById(
        detalleDto.producto?.id ?? 0,
      );
      if (!producto) {
        throw new NotFoundException(
          `Producto ${detalleDto.producto?.id ?? 0} no encontrado`,
        );
      }

      const detalle = DetallePedidoMapper.toDomain(detalleDto);
      detalle.producto = producto;
      detalle.pedido = pedidoGuardado;
      detalle.productoSabores = [];

      const detalleGuardado =
        await this.contextPedido.guardarDetallePedido(detalle);

      for (const productoSabor of detalleDto.sabores) {
        const saborEncontrado = sabores.find(
          (s) => s.id === productoSabor.sabor?.id,
        );
        if (!saborEncontrado) {
          throw new NotFoundException(
            `Sabor con ID ${productoSabor.sabor?.id} no encontrado`,
          );
        }
        const nuevoProductoSabor = new ProductoSabor(
          saborEncontrado,
          productoSabor.cantidad ?? 1,
        );
        nuevoProductoSabor.detallePedido = detalleGuardado;
        await this.contextPedido.guardarProductoSabor(nuevoProductoSabor);
      }
    }

    return { id: pedidoGuardado.id };
  }

  confirmarPedido(pedidoId: string): Promise<Pedido> {
    return this.contextPedido.confirmarPedido(pedidoId);
  }

  async changeEstado(id: number, estado: EstadosPedido): Promise<PedidoDto> {
    const pedido: Pedido = await this.contextPedido.cambiarEstado(id, estado);
    if (pedido.cliente && pedido.cliente.id !== undefined) {
      await this.notificacionesRepository.MandarNotificacion(
        pedido.cliente.id,
        'Hay novedades sobre tu pedido',
        construirMensajeEstado(estado),
      );
    }
    if (!pedido) {
      throw new NotFoundException(`Pedido con ID ${id} no encontrado`);
    }
    return PedidoMapper.toDto(pedido);
  }

  async changeEstadoPago(id: number, estado: EstadosPago): Promise<PedidoDto> {
    const pedido: Pedido = await this.contextPedido.cambiarEstadoPago(
      id,
      estado,
    );
    return PedidoMapper.toDto(pedido);
  }

  async ingresarFechaUltimoRecordatorioPago(
    pedido: PedidoDto,
  ): Promise<PedidoDto> {
    if (pedido.id) {
      const pedidoEditado: Pedido =
        await this.contextPedido.ingresarFechaUltimoRecordatorioPago(
          pedido.id,
          pedido.ultimoRecordatorioPago,
        );
      return PedidoMapper.toDto(pedidoEditado);
    }
    throw new Error('No se encontro el pedido');
  }
}
