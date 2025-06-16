import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sabor } from './entities/sabore.entity';
import { Repository } from 'typeorm';
import { SaborDto } from '../dominio/dto/sabor.dto';

@Injectable()
export class SaboresService {
  constructor(
    @InjectRepository(Sabor)
    private readonly saboresRepository: Repository<Sabor>,
  ) {}

  async alta(saborDto: SaborDto) {
    const { productos, ...rest } = saborDto;
    const sabor = this.saboresRepository.create({
      ...rest,
      productos: productos?.map((id) => ({ id })),
    });
    return await this.saboresRepository.save(sabor);
  }
  obtener(): Promise<Sabor[]> {
    return this.saboresRepository.find();
  }
}
