import { Module } from '@nestjs/common';
import { PdfService } from './pdf.service';
import { jwtConstants } from 'src/auth/auth.constans';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: jwtConstants.secret,
      signOptions: { expiresIn: '1d' },
    }),
  ],
  providers: [PdfService],
  exports: [PdfService],
})
export class PdfModule {}
