import { IsNotEmpty, IsString } from "class-validator";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { ChildEntity, Column } from "typeorm";

@ChildEntity()
export class Persona extends Cliente {

    @Column()
    @IsNotEmpty()
    @IsString()
    nombre: string;
    @Column()
    @IsNotEmpty()
    @IsString()
    apellido: string;

    static discriminador = 'Persona';
    
    constructor(
        email: string,
        contrasena: string,
        observaciones: string,
        departamento: string,
        ciudad: string,
        direccion: string,
        telefono: string,
        nombre: string,
        apellido: string,
    ) {
        super(email, contrasena, observaciones, departamento, ciudad, direccion, telefono);
        this.nombre = nombre;
        this.apellido = apellido;
       
    }
}
