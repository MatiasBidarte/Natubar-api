import { Test, TestingModule } from '@nestjs/testing';
import { ClientePersonaController } from './cliente-persona.controller';
import { ClientePersonaService } from './cliente-persona.service';

describe('ClientePersonaController', () => {
  let controller: ClientePersonaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientePersonaController],
      providers: [ClientePersonaService],
    }).compile();

    controller = module.get<ClientePersonaController>(ClientePersonaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
