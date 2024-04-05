'use client'

import Image from 'next/image'
import { useState } from 'react'
import { IoDownloadOutline, IoHeart, IoHeartOutline, IoPlay, IoStopCircle } from 'react-icons/io5'

export function CardMusic() {
  const [like, setLike] = useState<boolean>(false)
  const [play, setPlay] = useState<boolean>(false)
  return (
    <div
      className={`flex h-20 w-full flex-row items-center justify-center gap-4 rounded  p-3 ${play ? 'border border-neutral-500 bg-[#1C2133]' : ''}`}
    >
      <div className="relative aspect-square h-full rounded-lg">
        <Image src="/images/meme.png" fill alt="meme" className="rounded-lg" />
      </div>
      <div className="mr-4 flex flex-col gap-1">
        <p className="text-sm font-bold">Lorem Ipsum</p>
        <p className="text-xs">Lorem ipsum dolor sit amet consectetur. Elementum felis et.</p>
      </div>
      <div className="ml-4 flex flex-row gap-5">
        {play ? (
          <button type="button" onClick={() => setPlay(!play)}>
            <IoStopCircle className="text-flowkit-red h-5 w-5" />
          </button>
        ) : (
          <button type="button" onClick={() => setPlay(!play)}>
            <IoPlay className="h-5 w-5 " />
          </button>
        )}
        {like ? (
          <button type="button" onClick={() => setLike(!like)}>
            <IoHeart className="h-5 w-5 text-pink-900" />
          </button>
        ) : (
          <button type="button" onClick={() => setLike(!like)}>
            <IoHeartOutline className="h-5 w-5" />
          </button>
        )}
        <IoDownloadOutline className="h-5 w-5" />
      </div>
    </div>
  )
}

export default CardMusic
