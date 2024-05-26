'use client'

import { FaArrowUp, FaArrowLeft } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { useGetConversation } from '@/hooks/chat'
import { useEffect } from 'react'
import { LuLoader2 } from 'react-icons/lu'

export default function Page({ params }) {
  const { data, refetch, isLoading } = useGetConversation(params?.id)

  useEffect(() => {
    refetch()
  }, [params])

  return (
    <div className="text-md relative flex h-screen w-full flex-col bg-background pb-14">
      <div className="mb-4 flex flex-row items-center gap-2 rounded-b-lg border-b border-white bg-background px-2 py-4">
        <Link href="/chat">
          <FaArrowLeft className="h-5 w-5 text-white" />
        </Link>
        Tempat Wisata
      </div>
      {isLoading && data?.conversation?._id !== params?.id ? (
        <LuLoader2 className="mx-auto h-10  w-10 animate-spin text-main" />
      ) : (
        <div className="flex h-full flex-col gap-4 overflow-y-auto px-3">
          {data?.messages?.map((e, index) => (
            <div key={index} className="flex flex-col gap-2">
              <div className="ml-auto flex h-auto w-fit rounded-[20px] bg-slate-800 px-3 py-2">
                {e?.prompt}
              </div>
              <div className="flex flex-row gap-3">
                <div className="relative flex aspect-square h-[27px] w-[37px] ">
                  <Image src="/assets/chat.png" fill alt="logo-bot" />
                </div>
                <div className="w-4/5">{e?.response}</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Add Chat */}
      <div className="absolute bottom-3 w-full bg-transparent">
        <div className="relative flex w-full flex-row gap-2 bg-transparent px-3">
          <input className="z-0 flex flex-1 rounded-full border bg-transparent px-3 py-2" />
          <button
            type="button"
            className="absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2"
          >
            <FaArrowUp className="text-background" />
          </button>
        </div>
      </div>
    </div>
  )
}
