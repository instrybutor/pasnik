import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { NestJsCommonModule } from '@pasnik/nestjs/common';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    NestJsCommonModule,
  ],
  exports: [NestJsCommonModule],
})
export class NestJsCoreModule {}
