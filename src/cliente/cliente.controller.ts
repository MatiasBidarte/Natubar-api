import { BadRequestException, Body, Controller, Get, HttpException, HttpStatus, InternalServerErrorException, Post } from '@nestjs/common';
import { CreateClienteDto } from './dto/crear-cliente.dto';
import { ClienteService } from './cliente.service';
import { plainToInstance } from 'class-transformer';
import { Cliente } from './entities/cliente.entity';
import { validate } from 'class-validator';
import { Persona } from 'src/cliente-persona/entities/persona.entity';
import { ClienteEmpresa } from 'src/cliente-empresa/entities/cliente-empresa.entity';

@Controller('cliente')
export class ClienteController {
    constructor(private readonly clienteService: ClienteService) { }

    // Aquí puedes definir los endpoints del controlador de cliente
    // Por ejemplo, un endpoint para crear un cliente:
    // @Post()
    // createCliente(@Body() createClienteDto: CreateClienteDto) {
    //   return this.clienteService.create(createClienteDto);
    // }

    @Post()
    async add(@Body() clienteDto: CreateClienteDto) {
        try {
            let cliente;
            if (clienteDto.discriminador === Persona.discriminador) {
                cliente = plainToInstance(Persona, clienteDto, { enableImplicitConversion: true });
                console.log('Cliente transformado:', cliente);

            } else {
                cliente = plainToInstance(ClienteEmpresa, clienteDto);

            }

            const errores = await validate(cliente);
            if (errores.length > 0) {
                const mensajes = errores.map(err => ({
                    propiedad: err.property,
                    error: err.constraints ? Object.values(err.constraints) : ['Error desconocido'],
                }));
                throw new BadRequestException(JSON.stringify(mensajes));
            }
            console.log(cliente);
            return this.clienteService.create(cliente);
        } catch (ex) {
            if (ex instanceof BadRequestException) {
                throw new BadRequestException(`Error al crear el cliente: ${ex.message}`);
            } else if (ex instanceof HttpException) {
                throw new HttpException(`El correo ${clienteDto.email} ya está en uso.`, HttpStatus.CONFLICT);
            } else {
                throw new InternalServerErrorException('Error al crear el cliente: error desconocido');
            }
        }



    }

    @Get()
    findAll() {
        return this.clienteService.findAll();
    }

    @Get('Prueba')
    prueba() {
        return "Hola"
    }

}
