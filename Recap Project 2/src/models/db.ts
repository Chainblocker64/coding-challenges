import { open, Database } from "sqlite";
import sqlite3 from "sqlite3";

const filepath = process.env.DB_PATH || "";
let db: Database | null = null;

export async function connectDB(): Promise<Database> {
  db = await open({
    filename: filepath,
    driver: sqlite3.Database,
  });

  //TODO check if DB is actually a valid db
  console.log("Database connected.");

  return db;
}

export function getDB(): Database {
  if (!db) {
    throw new Error("Database is not connected");
  }
  return db;
}

export async function closeDB(): Promise<void> {
  if (db) {
    await db.close();
    db = null;
    console.log("Database connection closed.");
  }
}
