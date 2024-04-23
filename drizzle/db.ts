import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

// import "dotenv/config";
import * as dotenv from "dotenv"
dotenv.config({path: ".env.local"})

import * as schema from "./schema";

const connectionString = process.env.DB_URL!;
if (!connectionString) {
  console.log("No database connection string was provided.");
}

// for query purposes
const queryClient = neon(connectionString);
export const db = drizzle(queryClient, {logger: true});
