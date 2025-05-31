import { Exclude } from 'class-transformer';

export class RetornoEmpresaDto {
    email: string
    departamento: string
    ciudad: string
    direccion: string
    observaciones: string
    telefono: string
    nombreContacto: string
    nombreEmpresa: string
    RUT: number

    @Exclude()
    contrasena: string;

    constructor(tipoParcial: Partial<RetornoEmpresaDto>) {
        Object.assign(this, tipoParcial);
    }
}