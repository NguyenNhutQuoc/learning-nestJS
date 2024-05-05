import { DataSource } from 'typeorm';
import { config } from 'dotenv';
import { join } from 'path';

config();
console.log('Hello. This my friend');
export const MSSQL_SERVER_DATA_SOURCE = new DataSource({
  migrationsTableName: 'migrations',
  type: process.env.MSSQL_TYPE as any,
  host: process.env.MSSQL_HOST,
  port: Number(process.env.MSSQL_PORT),
  username: process.env.MSSQL_USERNAME,
  password: process.env.MSSQL_PASSWORD,
  database: process.env.MSSQL_DATABASE,
  synchronize: false,
  logging: true,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  subscribers: [],
  migrations: [join(__dirname, 'migrations', '*.{ts,js}')],
  options: {
    encrypt: true,
    trustServerCertificate: true,
  },
});
