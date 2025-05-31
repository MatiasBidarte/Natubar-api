import {PrimaryGeneratedColumn,Column,Entity,ManyToOne} from 'typeorm';
import { IsString, IsInt, IsEmail, IsNotEmpty, IsPhoneNumber} from 'class-validator';
import {Departamento} from '../../departamento/entities/departamento.entity';

@Entity({name: 'ciudades'})
export class Ciudad {

    @PrimaryGeneratedColumn()
    id:number

    @IsNotEmpty()
    @Column()
    nombre: string

    @IsNotEmpty()
    @ManyToOne(() => Departamento, (departamento) => departamento.ciudad )
    departamento: Departamento
}
