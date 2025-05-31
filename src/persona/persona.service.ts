import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { RetornoPersonaDto } from './dto/retorno-persona.dto';
import { Persona } from './entities/persona.entity';
import {NotFoundException} from '@nestjs/common';
import {InjectRepository} from '@nestjs/typeorm';
import {Repository} from 'typeorm';

@Injectable()
export class PersonaService {
  constructor(@InjectRepository(Persona) private readonly personasRepositorio: Repository<Persona>){}


  async create(createPersonaDto: CreatePersonaDto) {
    const persona = this.personasRepositorio.create(createPersonaDto);
    return new RetornoPersonaDto(await this.personasRepositorio.save(persona));
  }

  async findAll() {
    return await this.personasRepositorio.find();
  }

  async findOne(id: number) {
    return await this.personasRepositorio.findOne({where:{id}});
  }

  async update(id: number, updatePersonaDto: UpdatePersonaDto) {
    const persona = await this.personasRepositorio.findOne({where:{id}});
    if(!persona) throw new NotFoundException();
    Object.assign(persona, updatePersonaDto);
    return new RetornoPersonaDto(await this.personasRepositorio.save(persona));
  }

  async remove(id: number) {
    const persona = await this.personasRepositorio.findOne({where:{id}});
    if(!persona) throw new NotFoundException();
    return await this.personasRepositorio.remove(persona);
  }
}
