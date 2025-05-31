import { Injectable } from '@nestjs/common';
import { CreateEmpresaDto } from './dto/create-empresa.dto';
import { UpdateEmpresaDto } from './dto/update-empresa.dto';
import { RetornoEmpresaDto } from './dto/retorno-empresa.dto';
import {Repository} from 'typeorm';
import {InjectRepository} from '@nestjs/typeorm';
import {Empresa} from './entities/empresa.entity';
import {NotFoundException} from '@nestjs/common';

@Injectable()
export class EmpresaService {
  
  constructor(@InjectRepository(Empresa) private readonly empresasRepositorio: Repository<Empresa>){

  }

  async create(createEmpresaDto: CreateEmpresaDto) {
    const empresa = this.empresasRepositorio.create(createEmpresaDto);
    return new RetornoEmpresaDto(await this.empresasRepositorio.save(empresa));
  }

  async findAll() {
    return await this.empresasRepositorio.find();
  }

  async findOne(id: number) {
    return await this.empresasRepositorio.findOne({where:{id}});
  }

  async update(id: number, updateEmpresaDto: UpdateEmpresaDto) {
    const empresa = await this.empresasRepositorio.findOne({where:{id}});
    if(!empresa) throw new NotFoundException();
    Object.assign(empresa, updateEmpresaDto);
    return new RetornoEmpresaDto(await this.empresasRepositorio.save(empresa));
  }

  async remove(id: number) {
    const empresa = await this.empresasRepositorio.findOne({where:{id}});
    if(!empresa) throw new NotFoundException();
    return await this.empresasRepositorio.remove(empresa);
  }
}
