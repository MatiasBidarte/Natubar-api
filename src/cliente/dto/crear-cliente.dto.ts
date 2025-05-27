import { IsEmail, IsNotEmpty, IsPhoneNumber, IsString, MinLength } from 'class-validator';
export class crearClienteDto{

    email: string;
    contrasena: string;
    observaciones: string;
    departamento: string;
    ciudad: string;
    direccion: string;
    telefono: string;
}

