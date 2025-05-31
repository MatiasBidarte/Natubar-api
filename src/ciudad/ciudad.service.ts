import { Injectable } from '@nestjs/common';
import { CreateCiudadDto } from './dto/create-ciudad.dto';
import { UpdateCiudadDto } from './dto/update-ciudad.dto';
import {NotFoundException} from '@nestjs/common';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Ciudad} from './entities/ciudad.entity';

@Injectable()
export class CiudadService {

  constructor(@InjectRepository(Ciudad) private readonly ciudadesRepositorio: Repository<Ciudad>){

  }

  async create(createCiudadDto: CreateCiudadDto) {
    const ciudad = this.ciudadesRepositorio.create(createCiudadDto);
    return await this.ciudadesRepositorio.save(ciudad);
  }

  async findAll() {
    return await this.ciudadesRepositorio.find();
  }

  async findOne(id: number) {
    return await this.ciudadesRepositorio.findOne({where:{id}});
  }

  async update(id: number, updateCiudadDto: UpdateCiudadDto) {
    const ciudad = await this.ciudadesRepositorio.findOne({where:{id}});
    if(!ciudad) throw new NotFoundException();
    Object.assign(ciudad, updateCiudadDto);
    return await this.ciudadesRepositorio.save(ciudad);
  }

  async remove(id: number) {
    const ciudad = await this.ciudadesRepositorio.findOne({where:{id}});
    if(!ciudad) throw new NotFoundException();
    return await this.ciudadesRepositorio.remove(ciudad);
  }
}
