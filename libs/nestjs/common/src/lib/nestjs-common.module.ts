import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        secret: configService.get<string>('NX_JWT_SECRET'),
      }),
      inject: [ConfigService],
    }),
  ],
  exports: [JwtModule],
})
export class NestJsCommonModule {}
