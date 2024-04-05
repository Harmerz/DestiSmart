import { IoDownloadOutline, IoHeartOutline, IoPlay } from 'react-icons/io5'

import { Navbar } from '@/components/elements'

function CardMusic() {
  return (
    <div className="flex h-20 w-full flex-row items-center justify-center gap-4 rounded border border-neutral-500 bg-[#1C2133] p-3">
      <div className="aspect-square h-full rounded-lg">a</div>
      <div className="mr-4 flex flex-col gap-1">
        <p className="text-sm font-bold">Lorem Ipsum</p>
        <p className="text-xs">Lorem ipsum dolor sit amet consectetur. Elementum felis et.</p>
      </div>
      <div className="ml-4 flex flex-row gap-5">
        <IoPlay className="h-5 w-5" />
        <IoHeartOutline className="h-5 w-5" />
        <IoDownloadOutline className="h-5 w-5" />
      </div>
    </div>
  )
}

export default function DiscoverPage() {
  return (
    <div className="h-screen w-full bg-blue-900">
      <Navbar />
      <div className="mt-10 flex w-full justify-center">
        <div className="flex w-[55%] flex-col items-center justify-center">
          <div className="flex w-full flex-row gap-3 px-2">
            <input
              type="text"
              placeholder="Search"
              className="flex flex-grow rounded bg-[#1C2133] px-3 py-5"
            />
            <button type="button" className="rounded bg-neutral-300 px-6 py-3 text-black">
              Category
            </button>
          </div>
          <div className="my-7 grid grid-cols-2 gap-x-10 gap-y-7">
            <CardMusic />
            <CardMusic />
            <CardMusic />
            <CardMusic />
            <CardMusic />
            <CardMusic />
            <CardMusic />
          </div>
        </div>
      </div>
    </div>
  )
}
