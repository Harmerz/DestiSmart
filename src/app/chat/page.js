'use client'

import Image from 'next/image'
import Link from 'next/link'
import { BottomBar } from '@/components/bottomBar'
import { useGetListConversation } from '@/hooks/chat'

export default function ChatPage() {
  const { data } = useGetListConversation()
  return (
    <div className="relative min-h-screen w-full bg-background">
      <div className="flex w-full flex-col">
        {data?.map((e) => (
          <Link href={`/chat/${e._id}`} key={e}>
            <div className="flex flex-row items-center gap-3 border-b px-3 py-2">
              <div className="relative h-[27px] w-[37px]">
                <Image src="/assets/chat.png" fill alt="chat" />
              </div>
              <div className="flex w-4/5 flex-col">
                <p className="line-clamp-1 text-white">{e?.name}</p>
                <p className="text-sm text-slate-300">{e?.createdAt}</p>
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className="absolute bottom-0 w-full">
        <BottomBar />
      </div>
    </div>
  )
}
