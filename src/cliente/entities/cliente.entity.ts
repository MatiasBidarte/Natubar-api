import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from "class-validator";
import { ClienteInterface } from "../cliente.interface";
import { Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity({name : 'cliente'})
export class Cliente implements ClienteInterface {

    @PrimaryColumn()
    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    contrasena: string;

    @Column()
    @IsString()
    observaciones: string;

    @Column()
    @IsNotEmpty()
    departamento: string;

    @Column()
    @IsNotEmpty()
    ciudad: string;

    @Column()
    @IsNotEmpty()
    direccion: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    @IsPhoneNumber('UY')
    telefono: string;

    constructor(email: string, contrasena: string, observaciones: string, departamento: string, ciudad: string, direccion: string, telefono: string) {
        this.email = email;
        this.contrasena = contrasena;
        this.observaciones = observaciones;
        this.departamento = departamento;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.telefono = telefono;
    }
}
