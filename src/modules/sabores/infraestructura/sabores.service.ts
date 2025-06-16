import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Sabor } from './entities/sabor.entity';
import { Repository } from 'typeorm';

@Injectable()
export class SaboresService {
  constructor(
    @InjectRepository(Sabor)
    private readonly saboresRepository: Repository<Sabor>,
  ) {}

  obtener(): Promise<Sabor[]> {
    return this.saboresRepository.find();
  }
}
