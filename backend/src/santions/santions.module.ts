import { Module } from '@nestjs/common';
import { SantionsService } from './santions.service';
import { SantionsController } from './santions.controller';

@Module({
  providers: [SantionsService],
  controllers: [SantionsController]
})
export class SantionsModule {}
