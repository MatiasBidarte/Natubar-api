import { IsString } from "class-validator";


export class CreateClienteDto {

    email: string;

    contrasena: string;

    observaciones: string;

    departamento: string;

    ciudad: string;

    direccion: string;

    telefono: string;

    discriminador: string;

    constructor(
        email: string,
        contrasena: string,
        observaciones: string,
        departamento: string,
        ciudad: string,
        direccion: string,
        telefono: string
    ) {
        this.email = email;
        this.contrasena = contrasena;
        this.observaciones = observaciones;
        this.departamento = departamento;
        this.ciudad = ciudad;
        this.direccion = direccion;
        this.telefono = telefono;
    }
}

