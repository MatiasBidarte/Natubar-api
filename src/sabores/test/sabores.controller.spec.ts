import { Test, TestingModule } from '@nestjs/testing';
import { SaboresController } from './sabores.controller';
import { SaboresService } from './sabores.service';

describe('SaboresController', () => {
  let controller: SaboresController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SaboresController],
      providers: [SaboresService],
    }).compile();

    controller = module.get<SaboresController>(SaboresController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
