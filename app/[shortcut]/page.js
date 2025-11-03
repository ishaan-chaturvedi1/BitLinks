import clientPromise from "@/lib/mongodb"
import { redirect } from 'next/navigation'


const page = async ({params}) => {
    const main_params = await params
    const client = await clientPromise
    const db = client.db("bitlinks")
    const collection = db.collection("url")
    const doc = await collection.findOne({shortcut: main_params.shortcut})
    console.log(`The doc is - ${doc}`)
    console.log(`The shortcut is - ${main_params.shortcut}`)
  if(doc){
    redirect(doc.url)
  }
  else{
    return(
   <div className="min-h-[90vh] flex flex-col justify-center items-center font-bold text-2xl pb-10">BitLink not found</div>     
    )
  }
  }


export default page
