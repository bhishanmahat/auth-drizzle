// import type { Config } from "drizzle-kit";

import * as dotenv from "dotenv"
dotenv.config({path: ".env.local"})


// export default {
//   schema: "./drizzle/schema.ts",
//   out: "./drizzle/migrations",
//   driver: 'pg',
//   dbCredentials: {
//     connectionString: process.env.DB_URL!,
//   },
//   verbose: true,
//   strict: true
// } satisfies Config;

import {defineConfig} from "drizzle-kit";

export default defineConfig({
  dialect: "postgresql",
  schema: "./drizzle/schema.ts",
  out: "./drizzle/migrations",
  dbCredentials: {
    url: process.env.DB_URL!,
  },
  verbose: true,
  strict: true
})