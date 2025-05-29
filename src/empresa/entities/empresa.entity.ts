import {PrimaryGeneratedColumn,Column,Entity} from 'typeorm';
import {Cliente} from '../../cliente/entities/cliente.entity';

@Entity({name: 'empresas'})
export class Empresa extends Cliente {

    @Column()
    nombreContacto: string

    @Column()
    nombreEmpresa: string

    @Column({type:"bigint"})
    RUT: number

}
