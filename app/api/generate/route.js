import clientPromise from "@/lib/mongodb"
import cors from "cors"

app.use(cors())

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
}