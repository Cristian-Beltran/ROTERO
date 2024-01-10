import { Module } from '@nestjs/common';
import { TypeSantionsService } from './type-santions.service';
import { TypeSantionsController } from './type-santions.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypeSantion } from './type-santions.entity';
import { UsersModule } from 'src/users/users.module';
import { TypePayordersModule } from 'src/type-payorders/type-payorders.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([TypeSantion]),
    UsersModule,
    TypePayordersModule,
  ],
  providers: [TypeSantionsService],
  controllers: [TypeSantionsController],
  exports: [TypeSantionsService],
})
export class TypeSantionsModule {}
