import { Module } from '@nestjs/common';
import { ClassVehicleService } from './class-vehicle.service';
import { ClassVehicleController } from './class-vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClassVehicle } from './class-vehicle.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([ClassVehicle]), UsersModule],
  providers: [ClassVehicleService],
  controllers: [ClassVehicleController],
  exports: [ClassVehicleService],
})
export class ClassVehicleModule {}
