import { IsNotEmpty, IsString } from "class-validator";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { ChildEntity, Column } from "typeorm";

@ChildEntity()
export class ClientePersona extends Cliente {

    @Column()
    @IsNotEmpty()
    @IsString()
    Nombre: string;
    @Column()
    @IsNotEmpty()
    @IsString()
    Apellido: string;

    static discriminator = 'Persona';
    
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
        this.Nombre = nombre;
        this.Apellido = apellido;
       
    }
}
