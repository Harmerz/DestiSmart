'use client'

import { useState } from 'react'
import { IoSearch } from 'react-icons/io5'

import { CardMusic } from '@/app/favourite/_CardMusic'
import { Navbar } from '@/components/elements'
import { useGetFav } from '@/hooks/favourite'

export default function FavouritePage() {
  const { data } = useGetFav()
  console.log(data)
  const [now, setNow] = useState('')
  return (
    <div className="h-screen w-full bg-blue-900">
      <Navbar />
      <div className="mt-10 flex w-full justify-center">
        <div className="flex w-[55%] flex-col items-center justify-center ">
          <div className="flex w-full flex-row justify-between border-b pb-4">
            <div className="flex flex-col">
              <p className="text-3xl font-bold"> Favourites</p>
              <p>123 Sounds</p>
            </div>

            <div className="flex h-11 w-1/2 flex-row gap-3 px-2">
              <div className="relative flex w-full flex-grow">
                <IoSearch className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Search"
                  className="flex flex-grow rounded bg-[#1C2133] px-3 py-5 pl-12"
                />
              </div>
              <button type="button" className="rounded bg-neutral-300 px-6 py-3 text-black">
                Category
              </button>
            </div>
          </div>
          <div className="my-7 grid grid-cols-2 gap-x-10 gap-y-7">
            {data?.data?.soundMetadata?.map((item: any) => (
              <CardMusic item={item} key={item._id} now={now} setNow={setNow} />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
