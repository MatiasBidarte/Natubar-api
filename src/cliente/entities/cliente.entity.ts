import {PrimaryGeneratedColumn,Column, BeforeInsert, BeforeUpdate} from 'typeorm';
import { IsString, IsInt, IsEmail, IsNotEmpty, IsPhoneNumber} from 'class-validator';
import * as bcrypt from 'bcrypt';

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


    //MANEJO DE LA CONTRASEÑA CON HASHEO
    @IsNotEmpty()
    @Column({select: false})
    contrasena: string

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            //10 son las rondas de hasheo, es un número arbitrario
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
}