import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ClienteService } from '../infraestructura/cliente.service';
import { ClientePersona } from '../infraestructura/entities/cliente-persona.entity';
import { ClienteEmpresa } from '../infraestructura/entities/cliente-empresa.entity';
import { Pedido } from '../../pedidos/infraestructura/entities/pedido.entity';
import { Cliente } from '../infraestructura/entities/cliente.entity';

describe('ClienteService', () => {
  let service: ClienteService;
  let repository: Repository<Cliente>;

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
    detallesPedidos: [],
    cliente: mockClientePersona,
  } as unknown as Pedido;

  const mockRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    findOneBy: jest.fn(),
    save: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ClienteService,
        {
          provide: getRepositoryToken(Cliente),
          useValue: mockRepository,
        },
      ],
    }).compile();

    service = module.get<ClienteService>(ClienteService);
    repository = module.get<Repository<Cliente>>(getRepositoryToken(Cliente));
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
    expect(repository).toBeDefined();
  });

  describe('create', () => {
    it('should save and return a new cliente persona', async () => {
      mockRepository.save.mockResolvedValue(mockClientePersona);

      const result = await service.create(mockClientePersona);

      expect(result).toEqual(mockClientePersona);
      expect(mockRepository.save).toHaveBeenCalledWith(mockClientePersona);
    });

    it('should save and return a new cliente empresa', async () => {
      mockRepository.save.mockResolvedValue(mockClienteEmpresa);

      const result = await service.create(mockClienteEmpresa);

      expect(result).toEqual(mockClienteEmpresa);
      expect(mockRepository.save).toHaveBeenCalledWith(mockClienteEmpresa);
    });

    it('should throw an error if save fails', async () => {
      const errorMsg = 'Error guardando cliente';
      mockRepository.save.mockRejectedValue(new Error(errorMsg));

      await expect(service.create(mockClientePersona)).rejects.toThrow();
    });
  });

  describe('update', () => {
    it('should update and return the modified cliente', async () => {
      const updatedCliente = {
        ...mockClientePersona,
        telefono: '099999999',
      } as unknown as Cliente;
      mockRepository.save.mockResolvedValue(updatedCliente);

      const result = await service.update(updatedCliente);

      expect(result).toEqual(updatedCliente);
      expect(mockRepository.save).toHaveBeenCalledWith(updatedCliente);
    });

    it('should throw an error if update fails', async () => {
      mockRepository.save.mockRejectedValue(
        new Error('Error actualizando cliente'),
      );

      await expect(service.update(mockClientePersona)).rejects.toThrow();
    });
  });

  describe('findAll', () => {
    it('should return an array of clientes', async () => {
      const expectedClientes = [mockClientePersona, mockClienteEmpresa];
      mockRepository.find.mockResolvedValue(expectedClientes);

      const result = await service.findAll();

      expect(result).toEqual(expectedClientes);
      expect(mockRepository.find).toHaveBeenCalled();
    });
  });

  describe('findByEmail', () => {
    it('should return true if cliente exists with email', async () => {
      mockRepository.findOneBy.mockResolvedValue(mockClientePersona);

      const result = await service.findByEmail('test@example.com');

      expect(result).toBe(true);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        email: 'test@example.com',
      });
    });

    it('should return false if no cliente exists with email', async () => {
      mockRepository.findOneBy.mockResolvedValue(null);

      const result = await service.findByEmail('nonexistent@example.com');

      expect(result).toBe(false);
      expect(mockRepository.findOneBy).toHaveBeenCalledWith({
        email: 'nonexistent@example.com',
      });
    });
  });

  describe('findById', () => {
    it('should find and return a cliente by id', async () => {
      mockRepository.findOne.mockResolvedValue(mockClientePersona);

      const result = await service.findById(1);

      expect(result).toEqual(mockClientePersona);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return null if no cliente found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.findById(999);

      expect(result).toBeNull();
    });
  });

  describe('findOne', () => {
    it('should find and return a cliente by email', async () => {
      mockRepository.findOne.mockResolvedValue(mockClientePersona);

      const result = await service.findOne('test@example.com');

      expect(result).toEqual(mockClientePersona);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { email: 'test@example.com' },
      });
    });

    it('should return null if no cliente found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.findOne('nonexistent@example.com');

      expect(result).toBeNull();
    });
  });

  describe('pedidoPorCliente', () => {
    it('should return pedidos for a cliente', async () => {
      const clienteConPedidos = {
        ...mockClientePersona,
        pedidos: [mockPedido],
      };
      mockRepository.findOne.mockResolvedValue(clienteConPedidos);

      const result = await service.pedidoPorCliente(1);

      expect(result).toEqual([mockPedido]);
      expect(mockRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
        relations: [
          'pedidos',
          'pedidos.detallesPedidos',
          'pedidos.detallesPedidos.productoSabores.sabor',
        ],
      });
    });

    it('should return empty array if cliente not found', async () => {
      mockRepository.findOne.mockResolvedValue(null);

      const result = await service.pedidoPorCliente(999);

      expect(result).toEqual([]);
    });

    it('should return empty array if cliente has no pedidos', async () => {
      const clienteSinPedidos = { ...mockClientePersona, pedidos: [] };
      mockRepository.findOne.mockResolvedValue(clienteSinPedidos);

      const result = await service.pedidoPorCliente(1);

      expect(result).toEqual([]);
    });
  });
});
