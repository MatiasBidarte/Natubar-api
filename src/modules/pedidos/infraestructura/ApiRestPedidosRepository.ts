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
import { EstadosPedido, Pedido } from './entities/pedido.entity';
import { ClienteService } from 'src/modules/cliente/infraestructura/cliente.service';
import { ProductosService } from 'src/modules/productos/infraestructura/productos.service';
import { PedidoMapper } from '../dominio/mappers/pedido-mapper';
import { DetallePedidoMapper } from '../dominio/mappers/detalle-pedido-mapper';
import { ProductoSabor } from 'src/modules/productos/infraestructura/entities/producto-sabor.entity';
import { AuthService } from 'src/auth/auth.service';
import { SaboresRepository } from 'src/modules/sabores/dominio/interfaces/SaboresRepository';
import { ApiRestSaboresRepository } from 'src/modules/sabores/infraestructura/ApiRestSaboresRepository';

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
    @Inject(forwardRef(() => AuthService))
    private readonly authService: AuthService,
  ) {}
  getByEstado(estado: EstadosPedido): Promise<Pedido[]> {
    return this.contextPedido.getByEstado(estado);
  }

  obtenerTodos(): Pedido[] | PromiseLike<Pedido[]> {
    return this.contextPedido.obtenerPedidos();
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
        throw new NotFoundException(`Producto ${detalleDto.id} no encontrado`);
      }
      const detalle = DetallePedidoMapper.toDomain(detalleDto);
      const saborBD = await this.saboresRepository.obtenerTodos();
      for (const saborDto of detalleDto.sabores) {
        const saborEncontrado = saborBD.find((s) => s.id === saborDto.id);
        if (!saborEncontrado) {
          throw new NotFoundException(`Sabor ${saborDto.id} no encontrado`);
        }
        const productoSabor = new ProductoSabor(
          saborEncontrado,
          saborDto.cantidad || 0,
        );
        detalle.productoSabores.push(productoSabor);
      }
      detalle.producto = producto;
      detalle.pedido = pedidoGuardado;

      const detalleGuardado =
        await this.contextPedido.guardarDetallePedido(detalle);
      for (const productoSabor of detalleDto.sabores) {
        const saborEncontrado = sabores.find(
          (s) => s.id === productoSabor.sabor?.id,
        );

        if (!saborEncontrado) {
          throw new Error(
            `Sabor con ID ${productoSabor.sabor?.id} no encontrado`,
          );
        }

        const nuevoProductoSabor = new ProductoSabor(
          saborEncontrado,
          productoSabor.cantidad ?? 1,
        );

        nuevoProductoSabor.detallePedido = detalleGuardado;

        await this.contextPedido.guardarProductoSabor(nuevoProductoSabor);
        // Ahora podés guardar o hacer lo que necesites con nuevoProductoSabor
      }
    }
    return { id: pedidoGuardado.id };
  }

  confirmarPedido(pedidoId: string): Promise<Pedido> {
    return this.contextPedido.confirmarPedido(pedidoId);
  }
  async changeEstado(id: number, estado: EstadosPedido): Promise<Pedido> {
    const pedido: Pedido = await this.contextPedido.cambiarEstado(id, estado);
    return pedido;
  }
}
