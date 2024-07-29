import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Route } from './routes.entity';
import { UsersModule } from 'src/users/users.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { OperatorsModule } from 'src/operators/operators.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([Route]),
    UsersModule,
    OperatorsModule,
    CloudinaryModule,
  ],
  providers: [RoutesService],
  controllers: [RoutesController],
  exports: [RoutesService],
})
export class RoutesModule {}
