import clientPromise from "@/lib/mongodb"
import { NextResponse } from "next/server";

const allowedOrigin = process.env.NEXT_PUBLIC_HOST

export async function POST(request) {

    const body = await request.json()
    const client = await clientPromise
    const db = client.db("bitlinks")
    const collection = db.collection("url")

    const doc = await collection.findOne({shortcut: body.shortcut})
    console.log(doc)
    if(doc){
        return Response.json({message: "URL already exitsts!!", success: false, error: true})
    }

    let result = await collection.insertOne({
        url: body.url,
        shortcut: body.shortcut
    })

    return Response.json({message: "URL generated succesfully!!", success: true, error: false})
    
  return NextResponse.json(
    { received: body },
    {
      headers: {
        "Access-Control-Allow-Origin": allowedOrigin,
        "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
        "Access-Control-Allow-Headers": "Content-Type, Authorization",
      },
    }
  );
}

// Add this for CORS preflight
export function OPTIONS() {
  return NextResponse.json({}, {
    headers: {
      "Access-Control-Allow-Origin": allowedOrigin,
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
      "Access-Control-Allow-Headers": "Content-Type, Authorization",
    },
  });
}