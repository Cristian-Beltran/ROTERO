import { Module } from '@nestjs/common';
import { PayordersService } from './payorders.service';
import { PayordersController } from './payorders.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payorder } from './payorders.entity';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([Payorder])],
  providers: [PayordersService],
  controllers: [PayordersController],
})
export class PayordersModule {}
