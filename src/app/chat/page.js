'use client'

import Image from 'next/image'
import Link from 'next/link'
import { BottomBar } from '@/components/bottomBar'
import { useGetListConversation, useGetConversation, useSendMessages } from '@/hooks/chat'
import { FaArrowUp, FaArrowLeft } from 'react-icons/fa'
import { useEffect, useState } from 'react'
import { LuLoader2 } from 'react-icons/lu'

const HighlightedText = ({ text, highlight }) => {
  // Split the text by the highlight term while retaining the term in the array
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'))

  return (
    <div>
      {parts.map((part, index) =>
        part?.toLowerCase() === highlight?.toLowerCase() ? (
          <strong key={index}>{part}</strong>
        ) : (
          part
        ),
      )}
    </div>
  )
}

export default function ChatPage() {
  const [id, setId] = useState('')
  const { data } = useGetListConversation()
  const { data: conversation, refetch, isLoading } = useGetConversation(id)
  const { mutate: SendMessages, isSuccess } = useSendMessages()
  const [prompt, setPrompt] = useState('')
  const [temp, setTemp] = useState('')
  const [load, setLoading] = useState(false)
  const handleSend = (e) => {
    e.preventDefault()
    if (prompt !== '') {
      setLoading(true)
      setTemp(prompt)
      SendMessages({
        conversationID: id,
        destination: conversation?.conversation?.name,
        prompt: prompt,
      })
      setPrompt('')
    }
  }
  useEffect(() => {
    refetch(id)
  }, [isSuccess])

  useEffect(() => {
    setLoading(false)
    setTemp('')
  }, [conversation])

  useEffect(() => {
    refetch(id)
  }, [id])
  return (
    <div className="relative min-h-screen w-full bg-background">
      <div className="hidden w-full flex-row md:flex">
        <div className="flex h-screen max-h-screen w-full max-w-sm grow-0 flex-col overflow-y-auto border-r">
          {data?.map((e) => (
            <button
              type="button"
              key={e}
              onClick={() => setId(e?._id)}
              className="flex flex-row items-center gap-3 border-b px-3 py-2"
            >
              <div className="relative h-[27px] w-[37px]">
                <Image src="/assets/chat.png" fill alt="chat" />
              </div>
              <div className="flex w-4/5 flex-col">
                <p className="line-clamp-1 text-white">{e?.name}</p>
                <p className="text-sm text-slate-300">{e?.createdAt}</p>
              </div>
            </button>
          ))}
        </div>
        <div className="relative flex h-[calc(100vh-48px)] w-full grow overflow-y-auto">
          <div className="flex h-full max-h-[calc(100vh-48px)] w-full flex-col overflow-y-auto bg-background pb-14 text-sm md:text-base">
            <div className="mb-4 ml-3 flex flex-row items-center gap-2 rounded-b-lg border-b border-white bg-background px-2 py-4">
              {conversation?.conversation?.name}
            </div>
            {isLoading && conversation?.conversation?._id !== id ? (
              <LuLoader2 className="mx-auto h-10  w-10 animate-spin text-main" />
            ) : (
              <div className="no-scrollbar flex h-full flex-col-reverse gap-4 overflow-y-auto px-3 pb-4">
                {load && (
                  <>
                    <div className="mx-auto mb-5 h-10 w-10">
                      <LuLoader2 className="mx-auto h-10  w-10 animate-spin text-main" />
                    </div>
                    <div className="ml-auto flex h-auto w-fit rounded-[20px] bg-slate-800 px-3 py-2">
                      {temp}
                    </div>
                  </>
                )}
                {conversation?.messages?.map((e, index) => (
                  <div key={index} className="flex flex-col gap-2">
                    <div className="ml-auto flex h-auto w-fit rounded-[20px] bg-slate-800 px-3 py-2">
                      {e?.prompt}
                    </div>
                    <div className="flex flex-row gap-3">
                      <div className="relative flex aspect-square h-[27px] w-[37px] ">
                        <Image src="/assets/chat.png" fill alt="logo-bot" />
                      </div>
                      <div className="w-4/5">
                        <HighlightedText text={e?.response} highlight={data?.conversation?.name} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            {/* Add Chat */}
          </div>
          <div className="absolute bottom-3 w-full bg-transparent">
            <form
              onSubmit={handleSend}
              className="relative flex w-full flex-row gap-2 bg-transparent px-3"
            >
              <input
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                className="z-0 flex flex-1 rounded-full border bg-transparent px-3 py-2"
              />
              <button
                disabled={prompt === ''}
                type="submit"
                className={`absolute right-4 top-1/2 z-10 -translate-y-1/2 rounded-full  p-2 ${prompt === '' ? 'bg-slate-500' : 'bg-white'}`}
              >
                <FaArrowUp className="text-background" />
              </button>
            </form>
          </div>
        </div>
      </div>
      <div className="flex w-full flex-col md:hidden">
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
