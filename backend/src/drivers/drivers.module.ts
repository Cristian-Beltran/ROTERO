import { Module } from '@nestjs/common';
import { DriversService } from './drivers.service';
import { DriversController } from './drivers.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Driver } from './drivers.entity';
import { OperatorsModule } from 'src/operators/operators.module';

@Module({
  imports: [UsersModule, OperatorsModule, TypeOrmModule.forFeature([Driver])],
  providers: [DriversService],
  controllers: [DriversController],
  exports: [DriversService],
})
export class DriversModule {}
