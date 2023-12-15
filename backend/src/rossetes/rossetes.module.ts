import { Module } from '@nestjs/common';
import { RossetesController } from './rossetes.controller';
import { RossetesService } from './rossetes.service';

@Module({
  controllers: [RossetesController],
  providers: [RossetesService],
  exports: [RossetesService],
})
export class RossetesModule {}
