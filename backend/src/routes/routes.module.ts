import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './routes.entity';
import { UsersModule } from 'src/users/users.module';
import { VehicleModule } from 'src/vehicle/vehicle.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Route]),
    UsersModule,
    VehicleModule,
    CloudinaryModule,
  ],
  providers: [RoutesService],
  controllers: [RoutesController],
  exports: [RoutesService],
})
export class RoutesModule {}
