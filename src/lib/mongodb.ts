import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
let client: MongoClient | null = null;
let db: Db | null = null;

export async function getDb(): Promise<Db> {
  if (db) return db;
  client = new MongoClient(uri);
  await client.connect();
  db = client.db("alientrade");
  return db;
}
