import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";

const allowedOrigin = process.env.NEXT_PUBLIC_HOST;

export async function POST(request) {
  try {
    const body = await request.json();
    const client = await clientPromise;
    const db = client.db("bitlinks");
    const collection = db.collection("url");

    const existing = await collection.findOne({ shortcut: body.shortcut });

    if (existing) {
      return NextResponse.json(
        { message: "URL already exists!", success: false, error: true },
        { status: 400 }
      );
    }

    await collection.insertOne({
      url: body.url,
      shortcut: body.shortcut,
    });

    return NextResponse.json(
      { message: "URL generated successfully!", success: true, error: false },
      {
        headers: {
          "Access-Control-Allow-Origin": allowedOrigin,
        },
      }
    );
  } catch (error) {
    console.error("❌ Error in /api/generate:", error);
    return NextResponse.json(
      { message: "Internal server error", error: true },
      { status: 500 }
    );
  }
}

// CORS Preflight
export function OPTIONS() {
  return NextResponse.json(
    {},
    {
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}