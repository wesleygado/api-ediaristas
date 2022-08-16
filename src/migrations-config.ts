import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { TypeOrmConfigService } from './typeorm-config';

config();
const configService = new ConfigService();
const dataBase = new TypeOrmConfigService(configService);
export const dataConfigMigrations = new DataSource(
  dataBase.createTypeOrmOptions() as DataSourceOptions,
);
