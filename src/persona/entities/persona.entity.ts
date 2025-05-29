import {PrimaryGeneratedColumn,Column,Entity} from 'typeorm';
import {Cliente} from '../../cliente/entities/cliente.entity';

@Entity({name: 'personas'})
export class Persona extends Cliente{

    @Column()
    nombre: string

    @Column()
    apellido: string

}
