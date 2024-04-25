import postgres from "postgres";
import { drizzle } from "drizzle-orm/postgres-js";

import { migrate } from "drizzle-orm/postgres-js/migrator";

import * as dotenv from "dotenv"
dotenv.config({path: ".env.local"})

const connectionString = process.env.DB_URL!;
if (!connectionString) {
  console.log("No database connection string was provided.");
} 

// for migrations
const migrationClient = postgres(connectionString, { max: 1 });
const migrationDb = drizzle(migrationClient, {logger: true});

const main = async () => {
  try {
    console.log("🟢 Migration initiated...");
    await migrate(migrationDb, { migrationsFolder: "drizzle/migrations" });
    console.log("✅ Migration finished...");
  } catch (error) {
    console.log("❌ Error:", error);
  } finally {
    await migrationClient.end();
    console.log("🔴 Connection terminated...")
  }
};

main();
