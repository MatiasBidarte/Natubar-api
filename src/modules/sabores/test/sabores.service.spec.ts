import { Test, TestingModule } from '@nestjs/testing';
import { SaboresService } from './sabores.service';

describe('SaboresService', () => {
  let service: SaboresService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SaboresService],
    }).compile();

    service = module.get<SaboresService>(SaboresService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
