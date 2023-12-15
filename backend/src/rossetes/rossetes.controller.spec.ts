import { Test, TestingModule } from '@nestjs/testing';
import { RossetesController } from './rossetes.controller';

describe('RossetesController', () => {
  let controller: RossetesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RossetesController],
    }).compile();

    controller = module.get<RossetesController>(RossetesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
