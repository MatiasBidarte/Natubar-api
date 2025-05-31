import { Exclude } from 'class-transformer';

export class RetornoPersonaDto {
    email: string
    departamento: string
    ciudad: string
    direccion: string
    observaciones: string
    telefono: string
    nombre: string
    apellido: string

    @Exclude()
    contrasena: string;

    constructor(tipoParcial: Partial<RetornoPersonaDto>) {
        Object.assign(this, tipoParcial);
    }
}