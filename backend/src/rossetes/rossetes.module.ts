import { Module } from '@nestjs/common';
import { RossetesController } from './rossetes.controller';
import { RossetesService } from './rossetes.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Rossete } from './rossetes.entity';
import { UsersModule } from 'src/users/users.module';
import { RoutesModule } from 'src/routes/routes.module';
import { PdfModule } from 'src/pdf/pdf.module';
import { jwtConstants } from 'src/auth/auth.constans';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Rossete]),
    UsersModule,
    RoutesModule,
    PdfModule,
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  controllers: [RossetesController],
  providers: [RossetesService],
})
export class RossetesModule {}
