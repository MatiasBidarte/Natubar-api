import {PrimaryGeneratedColumn,Column,Entity,OneToMany} from 'typeorm';
import { IsString, IsInt, IsEmail, IsNotEmpty, IsPhoneNumber} from 'class-validator';
import {Ciudad} from '../../ciudad/entities/ciudad.entity';

@Entity({name: 'departamentos'})
export class Departamento {

    @PrimaryGeneratedColumn()
    id:number

    @IsNotEmpty()
    @Column({unique: true})
    nombre: string

    @OneToMany(type => Ciudad, ciudad => ciudad.departamento )
    ciudad: Ciudad[]

}
