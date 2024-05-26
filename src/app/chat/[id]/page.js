'use client'

import { FaArrowUp, FaArrowLeft } from 'react-icons/fa'
import Image from 'next/image'
import Link from 'next/link'
import { useGetConversation, useSendMessages } from '@/hooks/chat'
import { useEffect, useState } from 'react'
import { LuLoader2 } from 'react-icons/lu'

const HighlightedText = ({ text, highlight }) => {
  // Split the text by the highlight term while retaining the term in the array
  const parts = text.split(new RegExp(`(${highlight})`, 'gi'))

  return (
    <div>
      {parts.map((part, index) =>
        part.toLowerCase() === highlight.toLowerCase() ? <strong key={index}>{part}</strong> : part,
      )}
    </div>
  )
}

export default function Page({ params }) {
  const { data, refetch, isLoading } = useGetConversation(params?.id)
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
        conversationID: params?.id,
        destination: data?.conversation?.name,
        prompt: prompt,
      })
      setPrompt('')
    }
  }
  useEffect(() => {
    refetch()
  }, [isSuccess])

  useEffect(() => {
    setLoading(false)
    setTemp('')
  }, [data])

  useEffect(() => {
    refetch()
  }, [params])
  return (
    <div className="relative flex h-screen w-full flex-col bg-background pb-14 text-sm">
      <div className="mb-4 flex flex-row items-center gap-2 rounded-b-lg border-b border-white bg-background px-2 py-4">
        <Link href="/chat">
          <FaArrowLeft className="h-5 w-5 text-white" />
        </Link>
        {data?.conversation?.name}
      </div>
      {isLoading && data?.conversation?._id !== params?.id ? (
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
          {data?.messages?.map((e, index) => (
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
  )
}
