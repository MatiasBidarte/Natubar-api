import { IsNotEmpty, IsString } from "class-validator";
import { Cliente } from "src/cliente/entities/cliente.entity";
import { ChildEntity, Column } from "typeorm";

@ChildEntity({ name: 'Empresa' })
export class ClienteEmpresa extends Cliente {

    @Column()
    @IsNotEmpty()
    @IsString()
    nombreempresa: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    RUT: string;

    @Column()
    @IsNotEmpty()
    @IsString()
    nombrecontacto: string;

        static discriminador = 'Empresa';

    constructor(email: string, contrasena: string, observaciones: string, departamento: string, ciudad: string, direccion: string, telefono: string, NombreEmpresa: string, RUT: string, NombreContacto: string) {
        super(email, contrasena, observaciones, departamento, ciudad, direccion, telefono);
        this.nombreempresa = NombreEmpresa;
        this.RUT = RUT;
        this.nombrecontacto = NombreContacto;
    }


}
