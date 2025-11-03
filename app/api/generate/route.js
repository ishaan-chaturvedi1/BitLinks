import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";

export async function POST(req) {
  try {
    const { url, shortcut } = await req.json();

    if (!url || !shortcut) {
      return NextResponse.json({
        success: false,
        message: "Please provide both URL and shortcut."
      });
    }

    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("url");

    // Check if shortcut already exists
    const existing = await collection.findOne({ shortcut });

    if (existing) {
      return NextResponse.json({
        success: false,
        message: "This shortcut is already taken. Try another one!"
      });
    }

    // Insert new entry
    await collection.insertOne({
      url,
      shortcut,
      createdAt: new Date()
    });

    return NextResponse.json({
      success: true,
      message: "Short URL created successfully!",
      shortUrl: shortcut
    });

  } catch (error) {
    console.error("Error generating short URL:", error);
    return NextResponse.json({
      success: false,
      message: "Something went wrong on our end."
    });
  }
}
