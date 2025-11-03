import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    console.log("🔥 API HIT");

    const body = await request.json();
    console.log("📩 Body:", body);

    const client = await clientPromise;
    console.log("✅ Connected to MongoDB");

    const db = client.db("bitlinks");
    const collection = db.collection("url");

    const exists = await collection.findOne({ shortcut: body.shortcut });
    console.log("🔍 Exists:", exists);

    if (exists) {
      return NextResponse.json({ message: "Shortcut exists", success: false }, { status: 400 });
    }

    await collection.insertOne({
      url: body.url,
      shortcut: body.shortcut,
    });

    console.log("✅ Inserted");

    return NextResponse.json({ message: "Done", success: true });
  } catch (err) {
    console.error("❌ SERVER ERROR:", err);
    return NextResponse.json({ message: "Internal server error", success: false }, { status: 500 });
  }
}
