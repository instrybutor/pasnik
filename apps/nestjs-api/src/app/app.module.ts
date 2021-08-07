import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        migrationsRun: configService.get('RUN_MIGRATIONS', false),
        host: configService.get('TYPEORM_HOST'),
        port: +configService.get<number>('TYPEORM_PORT'),
        username: configService.get('TYPEORM_USERNAME'),
        password: configService.get('TYPEORM_PASSWORD'),
        database: configService.get('TYPEORM_DATABASE'),
        autoLoadEntities: true,
        synchronize: configService.get('TYPEORM_SYNCHRONIZE'),
        migrationsTableName: 'migrations_typeorm',
        migrations: [__dirname + './migrations/*{.ts,.js}'],
      }),
      inject: [ConfigService],
    }),
    AuthModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
