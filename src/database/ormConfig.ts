import { ConnectionOptions } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';
import path from 'path';
import {
  TYPEORM_DATABASE,
  TYPEORM_HOST,
  TYPEORM_PASSWORD,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_LOGGING,
} from '../config/secret';

const connectionOptions: ConnectionOptions = {
  type: 'mysql',
  entities: [path.resolve(`${__dirname}/model/*.{js,ts}`)],
  migrations: [`${__dirname}/migration/*`],
  synchronize: false,
  logging: Boolean(TYPEORM_LOGGING), // true => make it to true to log the sql queries
  host: TYPEORM_HOST,
  port: Number(TYPEORM_PORT),
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  namingStrategy: new SnakeNamingStrategy(),
};

export = connectionOptions;
