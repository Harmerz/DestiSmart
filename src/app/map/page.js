'use client'

import dynamic from 'next/dynamic'
import Image from 'next/image'
import { TbLocationShare } from 'react-icons/tb'
import { BottomBar } from '@/components/bottomBar'
import { LuLoader2 } from 'react-icons/lu'
import { useGetListLocation, useCreateConversation } from '@/hooks/chat'
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'

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
  const [displayCount, setDisplayCount] = useState(10)
  const router = useRouter()
  const { mutate: CreateConversation, data: conversation } = useCreateConversation()
  useEffect(() => {
    if (conversation) {
      router.push(`/chat/${conversation?.conversation?._id}`)
    }
  }, [conversation])

  const handleClick = (name) => {
    CreateConversation({ destination: name })
  }

  const { data, refetch } = useGetListLocation({
    ...position,
    display: displayCount,
  })

  useEffect(() => {
    refetch()
  }, [position, displayCount])

  const loadMore = () => {
    setDisplayCount(displayCount + 10)
  }

  return (
    <div className="relative flex w-full flex-col items-center justify-center bg-background md:flex-row">
      <div className="no-scrollbar flex h-full max-h-screen w-full flex-col overflow-y-scroll">
        <div className="relative flex h-[90%] w-full items-center justify-center bg-background md:h-full">
          <LazyMap position={position} setPosition={setPosition} locate={data} />
          <div className="h-[90vh] md:h-screen" />
        </div>

        <div className="z-10 -mt-5 flex w-full flex-col items-center justify-end rounded-t-xl bg-white pb-12 md:absolute md:right-4 md:top-10 md:max-h-[90vh] md:max-w-md md:overflow-y-auto md:rounded-xl md:pt-10">
          <button className="mt-3 h-1 w-10 rounded-full bg-black bg-opacity-30 md:hidden" />
          <p className="text-start text-2xl text-black">Tempat Terdekat dengan Anda</p>
          <div className="mt-6 flex h-full w-full flex-col gap-2 bg-white px-6 text-start md:max-h-[90vh] md:overflow-y-auto">
            {data?.map((item, index) => (
              <button
                type="button"
                onClick={() => handleClick(item?.name)}
                key={index}
                className="flex w-full flex-row gap-2 rounded border bg-white p-1"
              >
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
                    <h3 className="text-start font-bold">{item?.name}</h3>
                    <div className="flex flex-row items-center justify-center gap-1 text-[10px] text-gray-400">
                      <TbLocationShare /> {item?.distance?.toFixed(2) ?? '0'} km
                    </div>
                  </div>
                  <p className="line-clamp-3 text-start text-sm">{item?.description}</p>
                </div>
              </button>
            ))}
            <button
              onClick={loadMore}
              className="mt-4 rounded border border-blue-500 bg-white p-2 text-blue-500"
            >
              Load More
            </button>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 z-50 w-full">
        <BottomBar />
      </div>
    </div>
  )
}
