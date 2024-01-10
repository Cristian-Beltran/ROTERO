import { Module } from '@nestjs/common';
import { TypePayordersService } from './type-payorders.service';
import { TypePayordersController } from './type-payorders.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TypePayorder } from './type-payorders.entity';
import { UsersModule } from 'src/users/users.module';

@Module({
  imports: [TypeOrmModule.forFeature([TypePayorder]), UsersModule],
  providers: [TypePayordersService],
  controllers: [TypePayordersController],
  exports: [TypePayordersService],
})
export class TypePayordersModule {}
