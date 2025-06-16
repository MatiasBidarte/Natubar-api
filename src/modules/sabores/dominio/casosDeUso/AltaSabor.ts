import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { ApiRestSaboresRepository } from 'src/modules/sabores/infraestructura/ApiRestSaboresRepository';
import { SaboresRepository } from '../interfaces/SaboresRepository';
import { Sabor } from 'src/modules/sabores/infraestructura/entities/sabore.entity';
import { SaborDto } from '../dto/sabor.dto';
import { Producto } from 'src/modules/productos/infraestructura/entities/producto.entity';
@Injectable()
export class AltaSabor {
  constructor(
    @Inject(forwardRef(() => ApiRestSaboresRepository))
    private readonly saborRepository: SaboresRepository,
  ) {}

  async ejecutar(dto: Sabor): Promise<SaborDto> {
    const sabor: Sabor = {
      id: dto.id,
      nombre: dto.nombre,
      productos: dto.productos,
    };
    const s = await this.saborRepository.alta(sabor);
    return new SaborDto(
      s.id,
      s.nombre,
      Array.isArray(s.productos) && typeof s.productos[0] === 'object'
        ? (s.productos as unknown as Producto[]).map(
            (producto: Producto) => producto.id,
          )
        : s.productos,
    );
  }
}
