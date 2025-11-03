"use client"
import React from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

const shorten = () => {
  const router = useRouter();
  const [url, seturl] = useState("");
  const [shorturl, setShorturl] = useState("")
  const [generated, setGenerated] = useState(false)

  const generate = () => {
    console.log("Button clicked")
    const myHeaders = new Headers();
    myHeaders.append("Content-Type", "application/json");

    const raw = JSON.stringify({
      "url": url,
      "shortcut": shorturl
    });

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow"
    };

    fetch(`${process.env.NEXT_PUBLIC_HOST}/api/generate`, requestOptions)
      .then((response) => response.json())
      .then((result) => {
        seturl("")
        setShorturl("")
        setGenerated(`${process.env.NEXT_PUBLIC_HOST}/${shorturl}`)
        console.log(result)
        alert(result.message)
      })
      .catch((error) => console.error(error));
  }

  return (
    <div className='mx-auto max-w-[90vw] md:max-w-[40vw] flex justify-center items-center flex-col bg-purple-100 my-16 p-8 rounded-lg'>
      <h1 className='font-bold text-2xl mb-7'>Generate your short URLs</h1>
      <div className='flex flex-col gap-4 w-full'>
        <input type="text" value={url} placeholder="Enter your URL" className='p-2 bg-white rounded-lg focus:outline-purple-600' onChange={(e) => { seturl(e.target.value) }} />
        <input type="text" value={shorturl} placeholder="Enter your preferred short URL text" className='p-2 bg-white rounded-lg focus:outline-purple-600' onChange={(e) => { setShorturl(e.target.value) }} />
        <button className='cursor-pointer text-white bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-purple-300 dark:focus:ring-purple-800 shadow-lg shadow-purple-500/50 dark:shadow-lg dark:shadow-purple-800/80 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2' onClick={generate}>Generate</button>
      </div>
      {generated && <code className='mt-4'>
        Your Link - <Link target='_blank' className='cursor-pointer' href={generated}>{generated}</Link>
        </code>}
    </div>
  )
}

export default shorten

