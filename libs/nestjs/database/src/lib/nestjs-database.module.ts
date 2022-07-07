import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './db.config';

import 'pg';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      ...DatabaseConfig,
      autoLoadEntities: true,
    }),
  ],
})
export class NestJsDatabaseModule {}
