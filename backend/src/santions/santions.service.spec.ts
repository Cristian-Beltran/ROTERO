import { Test, TestingModule } from '@nestjs/testing';
import { SantionsService } from './santions.service';

describe('SantionsService', () => {
  let service: SantionsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SantionsService],
    }).compile();

    service = module.get<SantionsService>(SantionsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
