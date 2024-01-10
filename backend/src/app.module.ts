import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { RolesModule } from './roles/roles.module';
import { OperatorsModule } from './operators/operators.module';
import { PayordersModule } from './payorders/payorders.module';
import { SantionsModule } from './santions/santions.module';
import { OwnersModule } from './owners/owners.module';
import { DriversModule } from './drivers/drivers.module';
import { RoutesModule } from './routes/routes.module';
import { RossetesModule } from './rossetes/rossetes.module';
import { AuthModule } from './auth/auth.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { ConfigModule } from '@nestjs/config';
import { PdfModule } from './pdf/pdf.module';
import { VehicleModule } from './vehicle/vehicle.module';
import { TypeSantionsModule } from './type-santions/type-santions.module';
import { TypePayordersModule } from './type-payorders/type-payorders.module';
import { ClassVehicleModule } from './class-vehicle/class-vehicle.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'mariadb',
      username: 'root',
      password: 'holamundo',
      host: 'localhost',
      port: 3306,
      database: 'ROTERO',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
      timezone: '-4',
    }),
    UsersModule,
    RolesModule,
    OperatorsModule,
    PayordersModule,
    SantionsModule,
    OwnersModule,
    DriversModule,
    RoutesModule,
    RossetesModule,
    AuthModule,
    CloudinaryModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PdfModule,
    VehicleModule,
    TypeSantionsModule,
    TypePayordersModule,
    ClassVehicleModule,
  ],
})
export class AppModule {}
