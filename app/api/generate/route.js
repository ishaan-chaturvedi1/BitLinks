import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const body = await request.json();

    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("url");

    const exists = await collection.findOne({ shortcut: body.shortcut });

    if (exists) {
      return NextResponse.json(
        { message: "Shortcut already exists!", success: false },
        { status: 400 }
      );
    }

    await collection.insertOne({
      url: body.url,
      shortcut: body.shortcut,
    });

    return NextResponse.json(
      { message: "URL generated successfully!", success: true },
      { status: 200 }
    );
  } catch (err) {
    console.error("❌ ERROR IN /api/generate:", err);
    return NextResponse.json(
      { message: "Internal server error", success: false },
      { status: 500 }
    );
  }
}
