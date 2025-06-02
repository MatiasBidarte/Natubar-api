import { Test, TestingModule } from '@nestjs/testing';
import { ClientePersonaService } from './cliente-persona.service';

describe('ClientePersonaService', () => {
  let service: ClientePersonaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientePersonaService],
    }).compile();

    service = module.get<ClientePersonaService>(ClientePersonaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
