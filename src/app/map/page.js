'use client'

import dynamic from 'next/dynamic'
import data from './data.json'
import Image from 'next/image'
import { TbLocationShare } from 'react-icons/tb'
import { BottomBar } from '@/components/bottomBar'

const LazyMap = dynamic(() => import('@/app/map/_map'), {
  ssr: false,
  loading: () => <p>Loading...</p>,
})

export default function Home() {
  return (
    <main className="relative flex w-full items-center justify-center bg-background">
      {/* <LazyMap /> */}
      <BottomBar />
      <div className="z-10 flex h-screen w-full">
        <div className="flex h-screen w-full flex-col items-center self-end justify-self-end overflow-y-auto rounded-t-xl bg-white px-6">
          <button className="mt-3 h-1 w-10 rounded-full bg-black bg-opacity-30" />
          <div className="mt-6 flex w-full flex-col gap-2">
            <p className="text-start text-2xl text-black">Tempat Terdekat dengan Anda</p>
            {data?.map((e) => (
              <div key={e} className="flex flex-row gap-2 rounded border bg-white p-2 shadow-md">
                <div className="relative flex aspect-[4/3] min-h-[100px] rounded-sm">
                  <Image
                    src={`/assets/wisata/${e?.name?.toLowerCase().replace(/ /g, '-')}.jpg`}
                    alt={e.name}
                    fill
                    className="rounded-sm object-cover"
                  />
                </div>
                <div className="flex flex-col text-black">
                  <div className="flex flex-row items-center justify-between">
                    <h3 className="flex font-bold">{e?.name}</h3>{' '}
                    <div className="flex flex-row items-center justify-center gap-1 text-[10px] text-gray-400">
                      <TbLocationShare /> 18km
                    </div>
                  </div>
                  <p className="line-clamp-3 text-sm">{e?.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  )
}
