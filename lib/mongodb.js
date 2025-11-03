// lib/mongodb.js
import { MongoClient } from "mongodb";

const uri = process.env.MONGODB_URI;

if (!uri) {
  throw new Error("❌ Please add MONGODB_URI to your .env.local file");
}

let client;
let clientPromise;

if (process.env.NODE_ENV === "development") {
  // Reuse connection in dev to prevent multiple connections from hot reloads
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Fresh client in production
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export default clientPromise;
