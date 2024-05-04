'use client'

/* eslint-disable jsx-a11y/media-has-caption */
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { IoEllipsisVertical, IoPlay, IoStopCircle, IoTrashOutline } from 'react-icons/io5'

export function CardMusic({ item, now, setNow }: any) {
  const [play, setPlay] = useState<boolean>(false)
  const audioRef = useRef<HTMLAudioElement>(null)

  const playAudio = () => {
    if (audioRef.current) {
      audioRef.current
        .play()
        // eslint-disable-next-line no-console
        .catch((error) => console.error('Error playing the audio file:', error))
    }
  }
  const stopAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause()
      audioRef.current.currentTime = 0 // Reset the audio to the beginning
    }
  }
  // eslint-disable-next-line consistent-return
  useEffect(() => {
    const audioElement = audioRef.current
    if (audioElement) {
      const handleAudioEnd = () => setPlay(false)
      audioElement.addEventListener('ended', handleAudioEnd)

      return () => {
        audioElement.removeEventListener('ended', handleAudioEnd)
      }
    }
  }, [])
  useEffect(() => {
    if (now !== item?._id) {
      if (audioRef.current) {
        setPlay(false)
        audioRef.current.pause()
        audioRef.current.currentTime = 0 // Reset the audio to the beginning
      }
    }
  }, [now, item?._id])
  return (
    <div
      className={`flex h-20 w-full flex-row items-center justify-center gap-4 rounded  p-3 ${play ? 'border border-neutral-500 bg-[#1C2133]' : ''}`}
    >
      <audio ref={audioRef} src={item?.link} preload="auto" />

      <div className="relative aspect-square h-full rounded-lg">
        <Image src={item?.image} fill alt="meme" className="rounded-lg" />
      </div>
      <div className="mr-4 flex flex-col gap-1">
        <p className="text-sm font-bold">{item?.title}</p>
        <p className="text-xs">{item?.desc}</p>
      </div>
      <div className="ml-4 flex flex-row gap-5">
        {play ? (
          <button
            type="button"
            onClick={() => {
              setPlay(!play)
              stopAudio()
            }}
          >
            <IoStopCircle className="h-5 w-5 text-flowkit-red" />
          </button>
        ) : (
          <button
            type="button"
            onClick={() => {
              setNow(item?._id)
              setPlay(!play)
              playAudio()
            }}
          >
            <IoPlay className="h-5 w-5 " />
          </button>
        )}

        <FaRegEdit className="h-5 w-5" />
        <IoTrashOutline className="h-5 w-5" />
        <IoEllipsisVertical className="h-5 w-5" />
      </div>
    </div>
  )
}

export default CardMusic
