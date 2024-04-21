import type { Config } from "drizzle-kit";
import 'dotenv/config'


export default {
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  driver: 'pg',
  dbCredentials: {
    connectionString: process.env.DB_URL!,
  },
  verbose: true,
  strict: true
} satisfies Config;