import {PrimaryGeneratedColumn,Column} from 'typeorm';
import { IsString, IsInt, IsEmail, IsNotEmpty, IsPhoneNumber} from 'class-validator';

export abstract class Cliente{
    @PrimaryGeneratedColumn()
    id:number

    @IsNotEmpty()
    @IsEmail()
    @Column({unique: true})
    email: string

    @IsNotEmpty()
    @IsString()
    @Column()
    departamento: string

    @IsNotEmpty()
    @IsString()
    @Column()
    ciudad: string

    @IsNotEmpty()
    @IsString()
    @Column()
    direccion: string

    @Column({nullable: true})
    observaciones: string

    @IsNotEmpty()
    @IsPhoneNumber('UY')
    @Column()
    telefono: string
}