import 'dotenv/config';
import { GenericContainer } from 'testcontainers';

const runDbMigrations = async () => {
  const datasource = (await import('../../../db/datasource')).default;
  await datasource.initialize();
  await datasource.runMigrations();
  await datasource.destroy();
};

const createDb = async () => {
  const dbUrl = new URL(process.env.DB_URL!);

  const container = await new GenericContainer('postgres:15.4-alpine3.18')
    .withEnvironment({
      POSTGRES_USER: dbUrl.username,
      POSTGRES_PASSWORD: dbUrl.password,
      POSTGRES_DB: dbUrl.pathname.substring(1), // skipping frontslash
    })
    .withExposedPorts(5432)
    .start();

  process.env.DB_URL = process.env.DB_URL!.replace(
    '5432',
    container.getMappedPort(5432).toString(),
  );

  await runDbMigrations();
  return container;
};

export default async function () {
  global.db = await createDb();
}
