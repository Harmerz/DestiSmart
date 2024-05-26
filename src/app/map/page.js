'use client'

import dynamic from 'next/dynamic'
import data from './data.json'
import Image from 'next/image'
import { TbLocationShare } from 'react-icons/tb'
import { BottomBar } from '@/components/bottomBar'
import { calculateDistance } from './_calculate'
import { useEffect, useState } from 'react'
import { LuLoader2 } from 'react-icons/lu'

const LazyMap = dynamic(() => import('@/app/map/_map'), {
  ssr: false,
  loading: () => (
    <div>
      <LuLoader2 className="h-10 w-10 animate-spin text-main" />
    </div>
  ),
})

export default function Home() {
  const [position, setPosition] = useState(null)
  const [locate, setLocate] = useState(data)
  const [displayCount, setDisplayCount] = useState(10)

  useEffect(() => {
    if (position) {
      // const updatedLocate = locate
      //   .map((e) => {
      //     const [lat, lon] = e.location
      //     return {
      //       ...e,
      //       distance: calculateDistance(position?.lat, position?.lng, lat, lon),
      //     }
      //   })
      //   .sort((a, b) => a.distance - b.distance)
      // setLocate(updatedLocate)
    }
  }, [position])

  // Simulasi pengaturan posisi (Anda bisa menggantinya dengan logika yang sesuai)
  useEffect(() => {
    const examplePosition = [-7.797068, 110.370529] // Ganti dengan posisi yang diinginkan
    setPosition(examplePosition)
  }, [])

  const loadMore = () => {
    setDisplayCount(displayCount + 10)
  }
  console.log(position, locate)

  return (
    <div className="relative flex w-full max-w-[414px] flex-col items-center justify-center bg-background">
      <div className="no-scrollbar flex h-full max-h-screen w-full flex-col overflow-y-scroll">
        <div className="relative flex h-4/5 w-full items-center justify-center bg-background">
          <LazyMap
            position={position}
            setPosition={setPosition}
            locate={locate?.slice(0, displayCount)}
          />
          <div className="h-[80vh]" />
        </div>

        <div className="z-10 -mt-10 flex w-full flex-col items-center justify-end rounded-t-xl bg-white px-6">
          <button className="mt-3 h-1 w-10 rounded-full bg-black bg-opacity-30" />
          <p className="text-start text-2xl text-black">Tempat Terdekat dengan Anda</p>
          <div className="mt-6 flex h-full w-full flex-col gap-2 bg-white">
            {data?.slice(0, 10).map((item, index) => (
              <div key={index} className="flex w-full flex-row gap-2 rounded border bg-white p-1">
                <div className="relative flex aspect-[4/3] min-h-[100px] w-full rounded-sm">
                  <Image
                    src={`/assets/wisata/${item?.name?.toLowerCase().replace(/ /g, '-')}.jpg`}
                    alt={item.name}
                    fill
                    className="rounded-sm object-cover"
                  />
                </div>
                <div className="flex w-full flex-col text-black">
                  <div className="flex flex-row items-center justify-between">
                    <h3 className="font-bold">{item?.name}</h3>
                    <div className="flex flex-row items-center justify-center gap-1 text-[10px] text-gray-400">
                      <TbLocationShare /> {item?.distance?.toFixed(2) ?? '0'} km
                    </div>
                  </div>
                  <p className="line-clamp-3 text-sm">{item?.description}</p>
                </div>
              </div>
            ))}
            {/* {displayCount < locate.length && (
              <button
                onClick={loadMore}
                className="mt-4 rounded border border-blue-500 bg-white p-2 text-blue-500"
              >
                Load More
              </button>
            )} */}
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 z-50 w-full">
        <BottomBar />
      </div>
    </div>
  )
}
