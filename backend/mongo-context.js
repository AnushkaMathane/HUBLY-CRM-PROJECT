import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const uri = process.env.MONGO_URI;

if (!uri) {
  console.error("❌ MONGO_URI not found in .env file");
  process.exit(1);
}

let client;
let db;

export async function connectDB() {
  try {
    if (!client) {
      client = new MongoClient(uri);
      await client.connect();
      console.log("✅ Connected to MongoDB");

      // Extract DB name from URI (after last "/")
      const dbName = uri.split("/").pop();
      db = client.db(dbName);

      console.log(`📌 Using database: ${dbName}`);
    }

    return db;
  } catch (err) {
    console.error("❌ MongoDB connection error:", err);
    throw err;
  }
}

export function getDB() {
  if (!db) {
    throw new Error("❌ DB not initialized. Call connectDB() first.");
  }
  return db;
}
