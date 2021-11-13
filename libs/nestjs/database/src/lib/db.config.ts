import { ConnectionOptions } from 'typeorm';

import * as path from 'path';
import * as dotenv from 'dotenv';

const env = process.env.NODE_ENV || 'local';
const dotenv_path = path.resolve(process.cwd(), `.env.${env}`);
const result = dotenv.config({ path: dotenv_path });
if (result.error) {
  /* do nothing */
}

const getPath = (library, directory) =>
  path.relative(
    __dirname,
    path.join('libs', 'nestjs', library, 'src', directory)
  );

export const DatabaseConfig: ConnectionOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT) || 3306,
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [getPath('database', 'lib/entities/*.entity{.ts,.js}')],

  // We are using migrations, synchronize should be set to false.
  synchronize: false,

  migrationsRun: process.env.DB_MIGRATIONS === 'true',
  migrationsTableName: 'migrations',

  migrations: [getPath('migrations', '/**/*{.ts,.js}')],
  cli: {
    migrationsDir: getPath('migrations', '/'),
    entitiesDir: getPath('database', 'lib/entities'),
  },
};

export default DatabaseConfig;
