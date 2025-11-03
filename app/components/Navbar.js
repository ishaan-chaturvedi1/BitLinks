import React from 'react'
import Link from 'next/link'

const Navbar = () => {
  return (
    <nav className='h-[10vh] flex justify-between px-7 md:px-10 py-5 bg-purple-700 text-white items-center'>
      <div className="logo font-bold text-lg">
        BitLinks
      </div>
      <ul className='flex gap-3 items-center justify-between'>
        <Link className='cursor-pointer' href="/"><li>Home</li></Link>
        <Link className='cursor-pointer' href="/about"><li>About</li></Link>
        <li className='flex gap-3'>
          <Link  href="/shorten"><button className='cursor-pointer bg-purple-500 shadow-lg px-3 rounded-lg font-bold py-2'>Try Now</button></Link>
          <Link target="_blank"  href="https://github.com/ishaan-chaturvedi1/BitLinks"><button className='cursor-pointer bg-purple-500 shadow-lg px-3 rounded-lg font-bold py-2'>Github</button></Link>
        </li>
      </ul>
    </nav>
  )
}

export default Navbar
