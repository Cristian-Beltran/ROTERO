import { Module } from '@nestjs/common';
import { OwnersController } from './owners.controller';
import { OwnersService } from './owners.service';
import { OperatorsModule } from 'src/operators/operators.module';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Owner } from './owners.entity';

@Module({
  imports: [OperatorsModule, UsersModule, TypeOrmModule.forFeature([Owner])],
  providers: [OwnersService],
  controllers: [OwnersController],
  exports: [OwnersService],
})
export class OwnersModule {}
