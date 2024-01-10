import { Module } from '@nestjs/common';
import { SantionsService } from './santions.service';
import { SantionsController } from './santions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Santion } from './santions.entity';
import { UsersModule } from 'src/users/users.module';
import { OperatorsModule } from 'src/operators/operators.module';
import { PayordersModule } from 'src/payorders/payorders.module';
import { TypeSantionsModule } from 'src/type-santions/type-santions.module';

@Module({
  imports: [
    UsersModule,
    OperatorsModule,
    PayordersModule,
    TypeSantionsModule,
    TypeOrmModule.forFeature([Santion]),
  ],
  providers: [SantionsService],
  controllers: [SantionsController],
  exports: [SantionsService],
})
export class SantionsModule {}
