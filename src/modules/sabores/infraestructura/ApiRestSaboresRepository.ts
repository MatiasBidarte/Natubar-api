import { Injectable } from '@nestjs/common';
import { SaboresRepository } from '../dominio/interfaces/SaboresRepository';
import { SaborDto } from '../dominio/dto/sabor.dto';
import { SaboresService } from './sabores.service';
import { Sabor } from './entities/sabore.entity';
import { Producto } from 'src/modules/productos/infraestructura/entities/producto.entity';

@Injectable()
export class ApiRestSaboresRepository implements SaboresRepository {
  constructor(private readonly service: SaboresService) {}

  async alta(sabor: Sabor): Promise<SaborDto> {
    const productoIds = sabor.productos.map((producto) => producto.id);
    const saborDto = new SaborDto(sabor.id, sabor.nombre, productoIds);
    const createdSabor: Sabor = await this.service.alta(saborDto);
    return new SaborDto(
      createdSabor.id,
      createdSabor.nombre,
      createdSabor.productos.map((producto: Producto) => producto.id),
    );
  }

  async obtenerTodos(): Promise<SaborDto[]> {
    const rawProductos = await this.service.obtener();
    return rawProductos.map(
      (sabor) =>
        new SaborDto(
          sabor.id,
          sabor.nombre,
          sabor.productos.map((producto: Producto) => producto.id),
        ),
    );
  }
}
