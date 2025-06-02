import { PartialType } from '@nestjs/mapped-types';
import { CreateClientePersonaDto } from './create-cliente-persona.dto';

export class UpdateClientePersonaDto extends PartialType(CreateClientePersonaDto) {}
