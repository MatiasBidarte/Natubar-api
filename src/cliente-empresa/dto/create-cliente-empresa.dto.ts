
import { CreateClienteDto } from "src/cliente/dominio/dto/crear-cliente.dto";
import { ChildEntity } from "typeorm";


export class CreateClienteEmpresaDto extends CreateClienteDto {
    NombreEmpresa: string;
    RUT: string;
    NombreContacto: string;
    static discriminator = 'Empresa';
    constructor(
        email: string,
        contrasena: string,
        observaciones: string,
        departamento: string,
        ciudad: string,
        direccion: string,
        telefono: string,
        NombreEmpresa: string,
        RUT: string,
        NombreContacto: string
    ) {
        super(email, contrasena, observaciones, departamento, ciudad, direccion, telefono);
        this.NombreEmpresa = NombreEmpresa;
        this.RUT = RUT;
        this.NombreContacto = NombreContacto;
        this.discriminador = "Empresa";
    }


}
