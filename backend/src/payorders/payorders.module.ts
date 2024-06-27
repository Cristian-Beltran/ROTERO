import { Module } from '@nestjs/common';
import { PayordersService } from './payorders.service';
import { PayordersController } from './payorders.controller';
import { UsersModule } from 'src/users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payorder } from './payorders.entity';
import { OperatorsModule } from 'src/operators/operators.module';
import { PdfModule } from 'src/pdf/pdf.module';
import { ServiceModule } from 'src/service/service.module';
import { DetailPayorder } from './detail_payorder.entity';

@Module({
  imports: [
    PdfModule,
    UsersModule,
    OperatorsModule,
    ServiceModule,
    TypeOrmModule.forFeature([Payorder, DetailPayorder]),
  ],
  providers: [PayordersService],
  controllers: [PayordersController],
  exports: [PayordersService],
})
export class PayordersModule {}
