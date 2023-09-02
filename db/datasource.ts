import 'dotenv/config';
import { DataSource } from 'typeorm';

const datasource = new DataSource({
  type: 'postgres',
  url: process.env.DB_URL,
  entities: ['./src/**/*.entity.ts'],
  migrations: ['./db/migrations/*.ts'],
  logging: true,
});

export default datasource;
