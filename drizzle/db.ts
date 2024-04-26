import { neon } from "@neondatabase/serverless";
import { drizzle } from "drizzle-orm/neon-http";

import * as dotenv from "dotenv"
dotenv.config({path: ".env.local"})

// To check if the environment variable is being loaded or not
const connectionString = process.env.DB_URL!;
if (!connectionString) {
  console.log("No database connection string was provided.");
} 

// for query purposes
const queryClient = neon(connectionString);
export const db = drizzle(queryClient, /*{logger: true}*/);
