import { Test, TestingModule } from '@nestjs/testing';
import { RossetesService } from './rossetes.service';

describe('RossetesService', () => {
  let service: RossetesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RossetesService],
    }).compile();

    service = module.get<RossetesService>(RossetesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
