import 'dotenv/config';
import { defineConfig } from 'prisma/config';
import { validateEnv } from './src/config/env.schema';

const config = validateEnv(process.env);

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
    seed: 'ts-node prisma/seed.ts',
  },
  datasource: {
    url: config.DATABASE_URL,
  },
});
