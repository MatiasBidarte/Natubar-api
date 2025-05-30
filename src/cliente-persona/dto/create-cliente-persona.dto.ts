import { CreateClienteDto } from "src/cliente/dto/crear-cliente.dto";


export class CreateClientePersonaDto  extends CreateClienteDto {

    Nombre: string;
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
        apellido: string
    ) {
        super(email, contrasena, observaciones, departamento, ciudad, direccion, telefono);
        this.Nombre = nombre;
        this.Apellido = apellido;
    }
}
