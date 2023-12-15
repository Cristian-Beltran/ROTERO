import { Test, TestingModule } from '@nestjs/testing';
import { SantionsController } from './santions.controller';

describe('SantionsController', () => {
  let controller: SantionsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SantionsController],
    }).compile();

    controller = module.get<SantionsController>(SantionsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
