import { IsNotEmpty, IsString } from "class-validator";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { ChildEntity, Column } from "typeorm";

@ChildEntity()
export class ClienteEmpresa extends Cliente {

    @Column()
    @IsNotEmpty()
    @IsString()
    NombreEmpresa: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    RUT: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    NombreContacto: string;

        static discriminator = 'Empresa';

    constructor(email: string, contrasena: string, observaciones: string, departamento: string, ciudad: string, direccion: string, telefono: string, NombreEmpresa: string, RUT: string, NombreContacto: string) {
        super(email, contrasena, observaciones, departamento, ciudad, direccion, telefono);
        this.NombreEmpresa = NombreEmpresa;
        this.RUT = RUT;
        this.NombreContacto = NombreContacto;
    }


}
