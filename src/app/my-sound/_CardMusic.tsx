'use client'

/* eslint-disable jsx-a11y/media-has-caption */
import type { PopconfirmProps } from 'antd'
import { notification, Popconfirm } from 'antd'
import Image from 'next/image'
import { useCallback, useEffect, useRef, useState } from 'react'
import { FaRegEdit } from 'react-icons/fa'
import { IoEllipsisVertical, IoPlay, IoStopCircle, IoTrashOutline } from 'react-icons/io5'

import { useDeleteSounds } from '@/hooks/soundserver'

type NotificationType = 'success' | 'info' | 'warning' | 'error'

export function CardMusic({ item, now, setNow }: any) {
  const [play, setPlay] = useState<boolean>(false)
  const [api, contextHolder] = notification.useNotification()

  const audioRef = useRef<HTMLAudioElement>(null)
  const { mutate: deleteSound, isSuccess, isError, error: errorDelete } = useDeleteSounds()
  const openNotificationWithIcon = useCallback(
    (type: NotificationType) => {
      api[type]({
        message: 'Sound Delete',
        description: `Delete Sound ${item?.title} Is ${type}`,
      })
    },
    [api, item?.title],
  )
  useEffect(() => {
    if (isSuccess) {
      openNotificationWithIcon('success')
    }
    if (isError) {
      openNotificationWithIcon('error')
      console.error(errorDelete)
    }
  }, [errorDelete, isError, isSuccess, openNotificationWithIcon])
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

  const confirm: PopconfirmProps['onConfirm'] = () => {
    deleteSound(item?._id)
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
    <>
      {contextHolder}
      <div
        className={`flex h-20 w-full flex-row items-center justify-center gap-4 rounded  p-3 ${play ? 'border border-neutral-500 bg-[#1C2133]' : ''}`}
      >
        <audio ref={audioRef} src={item?.link} preload="auto" />

        <div className="relative aspect-square h-full rounded-lg">
          <Image src={item?.image} fill alt="meme" className="rounded-lg" />
        </div>
        <div className="mr-4 flex flex-grow flex-col gap-1">
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
          <Popconfirm
            title="Delete the sound"
            description="Are you sure to delete this sound?"
            onConfirm={confirm}
            okText="Yes"
            cancelText="No"
          >
            <button type="button">
              <IoTrashOutline className="h-5 w-5 hover:text-red-600" />
            </button>
          </Popconfirm>
          <IoEllipsisVertical className="h-5 w-5" />
        </div>
      </div>
    </>
  )
}

export default CardMusic
