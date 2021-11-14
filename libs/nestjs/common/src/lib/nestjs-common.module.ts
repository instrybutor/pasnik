import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { BASE_URL, baseUrlProvider } from './providers/baseUrl.provider';
import { API_URL, apiUrlProvider } from './providers/apiUrl.provider';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
        };
      },
      inject: [ConfigService],
    }),
  ],
  providers: [baseUrlProvider, apiUrlProvider],
  exports: [BASE_URL, API_URL, JwtModule],
})
export class NestJsCommonModule {}
