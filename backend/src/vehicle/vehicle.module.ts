import { Module } from '@nestjs/common';
import { VehicleService } from './vehicle.service';
import { VehicleController } from './vehicle.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vehicle } from './vehicle.entity';
import { OwnersModule } from 'src/owners/owners.module';
import { UsersModule } from 'src/users/users.module';
import { DriversModule } from 'src/drivers/drivers.module';
import { OperatorsModule } from 'src/operators/operators.module';
import { ClassVehicleModule } from 'src/class-vehicle/class-vehicle.module';
import { PdfModule } from 'src/pdf/pdf.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Vehicle]),
    OperatorsModule,
    OwnersModule,
    UsersModule,
    DriversModule,
    ClassVehicleModule,
    PdfModule,
  ],
  providers: [VehicleService],
  controllers: [VehicleController],
  exports: [VehicleService],
})
export class VehicleModule {}
