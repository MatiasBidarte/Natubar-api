/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/unbound-method */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Test, TestingModule } from '@nestjs/testing';
import { HttpException, InternalServerErrorException } from '@nestjs/common';
import { ApiRestClientesRepository } from '../infraestructura/ApiRestClientesRepository';
import { ClienteService } from '../infraestructura/cliente.service';
import { AuthService } from 'src/auth/auth.service';
import { ClientePersona } from '../infraestructura/entities/cliente-persona.entity';
import { ClienteEmpresa } from '../infraestructura/entities/cliente-empresa.entity';
import { ActualizarClienteDto } from '../dominio/dto/actualizar-cliente.dto';
import { PedidoMapper } from 'src/modules/pedidos/dominio/mappers/pedido-mapper';

// Mock de PedidoMapper para evitar dependencias externas
jest.mock('src/modules/pedidos/dominio/mappers/pedido-mapper', () => ({
  PedidoMapper: {
    toDto: jest.fn((pedido) => ({
      id: pedido.id,
      estado: pedido.estado,
      fechaCreacion: pedido.fechaCreacion,
      montoTotal: pedido.montoTotal,
    })),
  },
}));

describe('ApiRestClientesRepository', () => {
  let repository: ApiRestClientesRepository;
  let clienteService: ClienteService;
  let authService: AuthService;

  // Datos de prueba
  const mockClientePersona = new ClientePersona(
    'test@example.com',
    'password123',
    'Observación de prueba',
    'Montevideo',
    'Montevideo',
    'Calle Test 123',
    '099123456',
    'Juan',
    'Pérez',
  );
  mockClientePersona.id = 1;

  const mockClienteEmpresa = new ClienteEmpresa(
    'empresa@example.com',
    'password456',
    'Empresa observación',
    'Canelones',
    'Ciudad de la Costa',
    'Avenida Test 456',
    '099789012',
    'María Rodríguez',
    '123456789',
    'Empresa Test S.A.',
  );
  mockClienteEmpresa.id = 2;

  const mockPedido = {
    id: 1,
    fechaCreacion: new Date(),
    fechaEntrega: null,
    fechaEntregaEstimada: new Date(),
    montoTotal: 1500,
    estado: 'En Preparación',
    descuento: 0,
    productos: [],
    cliente: mockClientePersona,
  };

  const mockClienteService = {
    pedidoPorCliente: jest.fn(),
    findAll: jest.fn(),
    findByEmail: jest.fn(),
    findById: jest.fn(),
    create: jest.fn(),
    update: jest.fn(),
  };

  const mockAuthService = {
    signIn: jest.fn(),
    generateTokenForUser: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ApiRestClientesRepository,
        { provide: ClienteService, useValue: mockClienteService },
        { provide: AuthService, useValue: mockAuthService },
      ],
    }).compile();

    repository = module.get<ApiRestClientesRepository>(
      ApiRestClientesRepository,
    );
    clienteService = module.get<ClienteService>(ClienteService);
    authService = module.get<AuthService>(AuthService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(repository).toBeDefined();
  });

  describe('pedidosPorCliente', () => {
    it('should return mapped pedidos for a client', async () => {
      mockClienteService.pedidoPorCliente.mockResolvedValue([mockPedido]);

      const result = await repository.pedidosPorCliente(1);

      expect(result.length).toBe(1);
      expect(PedidoMapper.toDto).toHaveBeenCalledWith(mockPedido);
      expect(mockClienteService.pedidoPorCliente).toHaveBeenCalledWith(1);
    });

    it('should return empty array if no pedidos found', async () => {
      mockClienteService.pedidoPorCliente.mockResolvedValue([]);

      const result = await repository.pedidosPorCliente(1);

      expect(result).toEqual([]);
    });
  });

  describe('obtenerTodos', () => {
    it('should return all clients', async () => {
      const expectedClientes = [mockClientePersona, mockClienteEmpresa];
      mockClienteService.findAll.mockResolvedValue(expectedClientes);

      const result = await repository.obtenerTodos();

      expect(result).toEqual(expectedClientes);
    });
  });

  describe('alta', () => {
    it('should throw an exception if email already exists', async () => {
      mockClienteService.findByEmail.mockResolvedValue(true);

      await expect(repository.alta(mockClientePersona)).rejects.toThrow(
        HttpException,
      );
      expect(mockClienteService.findByEmail).toHaveBeenCalledWith(
        'test@example.com',
      );
      expect(mockClienteService.create).not.toHaveBeenCalled();
    });

    it('should create client and return access token', async () => {
      mockClienteService.findByEmail.mockResolvedValue(false);
      mockClienteService.create.mockResolvedValue(mockClientePersona);
      mockAuthService.signIn.mockResolvedValue({ access_token: 'test-token' });

      const result = await repository.alta(mockClientePersona);

      expect(result).toEqual({ access_token: 'test-token' });
      expect(mockClienteService.create).toHaveBeenCalledWith(
        mockClientePersona,
      );
      expect(mockAuthService.signIn).toHaveBeenCalledWith(
        'test@example.com',
        'password123',
      );
    });

    it('should handle unknown errors', async () => {
      mockClienteService.findByEmail.mockResolvedValue(false);
      mockClienteService.create.mockRejectedValue(new Error('Unknown error'));

      await expect(repository.alta(mockClientePersona)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });

  describe('actualizar', () => {
    const updateDto: ActualizarClienteDto = {
      telefono: '098765432',
      direccion: 'Nueva dirección',
      nombre: 'Juan Carlos',
      apellido: 'Pérez González',
    };

    it('should throw an exception if client not found', async () => {
      mockClienteService.findById.mockResolvedValue(null);

      await expect(repository.actualizar(999, updateDto)).rejects.toThrow(
        HttpException,
      );
      expect(mockClienteService.findById).toHaveBeenCalledWith(999);
      expect(mockClienteService.update).not.toHaveBeenCalled();
    });

    it('should throw an exception if a required field is empty', async () => {
      mockClienteService.findById.mockResolvedValue(mockClientePersona);

      const invalidDto = { ...updateDto, telefono: '' };

      await expect(repository.actualizar(1, invalidDto)).rejects.toThrow(
        HttpException,
      );
      expect(mockClienteService.update).not.toHaveBeenCalled();
    });

    it('should update a ClientePersona correctly', async () => {
      mockClienteService.findById.mockResolvedValue(mockClientePersona);

      const updatedCliente = {
        ...mockClientePersona,
        telefono: updateDto.telefono,
        direccion: updateDto.direccion,
        nombre: updateDto.nombre,
        apellido: updateDto.apellido,
      };

      mockClienteService.update.mockResolvedValue(updatedCliente);
      mockAuthService.generateTokenForUser.mockReturnValue({
        access_token: 'updated-token',
      });

      const result = await repository.actualizar(1, updateDto);

      expect(result).toHaveProperty('cliente');
      expect(result).toHaveProperty('access_token', 'updated-token');
      expect(mockClienteService.update).toHaveBeenCalled();
      expect(mockAuthService.generateTokenForUser).toHaveBeenCalled();
    });

    it('should update a ClienteEmpresa correctly', async () => {
      mockClienteService.findById.mockResolvedValue(mockClienteEmpresa);

      const empresaUpdateDto = {
        telefono: '098765432',
        nombreEmpresa: 'Nueva Empresa S.A.',
        nombreContacto: 'José Contacto',
        rut: '987654321',
      };

      const updatedCliente = {
        ...mockClienteEmpresa,
        telefono: empresaUpdateDto.telefono,
        nombreEmpresa: empresaUpdateDto.nombreEmpresa,
        nombreContacto: empresaUpdateDto.nombreContacto,
        rut: empresaUpdateDto.rut,
      };

      mockClienteService.update.mockResolvedValue(updatedCliente);
      mockAuthService.generateTokenForUser.mockReturnValue({
        access_token: 'updated-token',
      });

      const result = await repository.actualizar(2, empresaUpdateDto);

      expect(result).toHaveProperty('cliente');
      expect(result).toHaveProperty('access_token', 'updated-token');
      expect(mockClienteService.update).toHaveBeenCalled();
    });

    it('should allow empty observaciones', async () => {
      mockClienteService.findById.mockResolvedValue(mockClientePersona);

      const updateDtoWithEmptyObs = { ...updateDto, observaciones: '' };
      const updatedCliente = {
        ...mockClientePersona,
        ...updateDtoWithEmptyObs,
      };

      mockClienteService.update.mockResolvedValue(updatedCliente);
      mockAuthService.generateTokenForUser.mockReturnValue({
        access_token: 'updated-token',
      });

      const result = await repository.actualizar(1, updateDtoWithEmptyObs);

      expect(result).toHaveProperty('cliente');
      expect(mockClienteService.update).toHaveBeenCalled();
    });

    it('should handle unknown errors during update', async () => {
      mockClienteService.findById.mockResolvedValue(mockClientePersona);
      mockClienteService.update.mockRejectedValue(new Error('Unknown error'));

      await expect(repository.actualizar(1, updateDto)).rejects.toThrow(
        InternalServerErrorException,
      );
    });
  });
});
