import Image from 'next/image'
import Link from 'next/link'

export default function Home() {
  return (
    <div className="flex min-h-screen w-full flex-col items-center justify-center bg-background pb-14 ">
      <div className="relative -ml-48 flex aspect-[650/570] w-full">
        <Image src="/assets/maskot.png" fill alt="maskot" />
      </div>
      <div className=" mx-7 text-center text-2xl text-text">Temukan Tempat Impian Anda dengan</div>
      <h1 className="mt-4 text-4xl font-medium text-main">DestiSmart</h1>
      <Link href="/signin">
        <button className="mt-8 rounded-xl bg-main px-12 py-5 text-2xl text-white" type="buttton">
          Mulai Petualangan
        </button>
      </Link>
    </div>
  )
}
