import { Module } from '@nestjs/common';
import { OperatorsService } from './operators.service';
import { OperatorsController } from './operators.controller';
import { UsersModule } from 'src/users/users.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Operator } from './operators.entity';

@Module({
  imports: [
    UsersModule,
    CloudinaryModule,
    TypeOrmModule.forFeature([Operator]),
  ],
  providers: [OperatorsService],
  controllers: [OperatorsController],
  exports: [OperatorsService],
})
export class OperatorsModule {}
