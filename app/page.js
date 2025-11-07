import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <section className="flex h-[58vh] flex-wrap">
        <div className="flex w-[99vw] p-10 md:p-0 md:w-[49vw] flex-col items-center gap-4 justify-center">
          <p className="text-2xl font-bold">The best URL shortener in the Market</p>
          <p className="px-5 md:px-16">We are the most straightforward URL shortener in the world. Most of the URl shorteners will track you or ask you to give your details for login. We understand your needs and hence we have created this URL shortener.</p>
          <li className='flex gap-3'>
            <Link href="/shorten"><button className='text-white cursor-pointer bg-purple-500 shadow-lg px-3 rounded-lg font-bold py-2'>Try Now</button></Link>
            <Link target="_blank" href="https://github.com/ishaan-chaturvedi1/BitLinks"><button className='text-white cursor-pointer bg-purple-500 shadow-lg px-3 rounded-lg font-bold py-2'>Github</button></Link>
          </li>
        </div>
        <div className="flex w-[99vw] md:w-[49vw] justify-start relative">
          <Image src="/vector.jpg" alt="A vector image showing people who are creative" fill={true} />
        </div>

      </section>
    </main>
  );
}
