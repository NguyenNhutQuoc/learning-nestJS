import 'reflect-metadata';
import { DataSource } from 'typeorm';
import * as process from 'node:process';
import { config } from 'dotenv';
import { join } from 'path';

config();
console.log(join(__dirname, 'migrations', '*.{ts,js}'));
export const AppDataSource = new DataSource({
  migrationsTableName: 'migrations',
  type: process.env.MSSQL_TYPE as any,
  host: process.env.MSSQL_HOST,
  port: Number(process.env.MSSQL_PORT),
  username: process.env.MSSQL_USERNAME,
  password: process.env.MSSQL_PASSWORD,
  database: process.env.MSSQL_DATABASE,
  synchronize: false,
  logging: true,
  entities: ['dist/**/*.entity.{ts,js}'],
  subscribers: [],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
});
