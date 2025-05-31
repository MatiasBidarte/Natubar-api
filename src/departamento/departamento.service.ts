import { Injectable } from '@nestjs/common';
import { CreateDepartamentoDto } from './dto/create-departamento.dto';
import { UpdateDepartamentoDto } from './dto/update-departamento.dto';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Departamento} from './entities/departamento.entity';
import {NotFoundException} from '@nestjs/common';

@Injectable()
export class DepartamentoService {

  constructor(@InjectRepository(Departamento) private readonly departamentosRepositorio: Repository<Departamento>){

  }

  async create(createDepartamentoDto: CreateDepartamentoDto) {
    const departamento = this.departamentosRepositorio.create(createDepartamentoDto);
    return await this.departamentosRepositorio.save(departamento);
  }

  async findAll() {
    return await this.departamentosRepositorio.find();
  }

  async findOne(id: number) {
    return await this.departamentosRepositorio.findOne({where:{id}});
  }

  async update(id: number, updateDepartamentoDto: UpdateDepartamentoDto) {
    const departamento = await this.departamentosRepositorio.findOne({where:{id}});
    if(!departamento) throw new NotFoundException();
    Object.assign(departamento, updateDepartamentoDto);
    return await this.departamentosRepositorio.save(departamento);
  }

  async remove(id: number) {
    const departamento = await this.departamentosRepositorio.findOne({where:{id}});
    if(!departamento) throw new NotFoundException();
    return await this.departamentosRepositorio.remove(departamento);
  }
}
