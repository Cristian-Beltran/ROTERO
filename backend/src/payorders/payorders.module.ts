import { Module } from '@nestjs/common';
import { PayordersService } from './payorders.service';
import { PayordersController } from './payorders.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payorder } from './payorders.entity';
import { OperatorsModule } from 'src/operators/operators.module';
import { PdfModule } from 'src/pdf/pdf.module';
import { TypePayordersModule } from 'src/type-payorders/type-payorders.module';

@Module({
  imports: [
    PdfModule,
    UsersModule,
    OperatorsModule,
    TypePayordersModule,
    TypeOrmModule.forFeature([Payorder]),
  ],
  providers: [PayordersService],
  controllers: [PayordersController],
  exports: [PayordersService],
})
export class PayordersModule {}
