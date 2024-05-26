'use client'

import { IoMdMenu } from 'react-icons/io'
import { BottomBar } from '@/components/bottomBar'
import { Select, DatePicker } from 'antd'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'
import { useHomeRecomendation, useCustomPrompt } from '@/hooks/chat'
import { LuLoader2 } from 'react-icons/lu'

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number)
}

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase()?.includes(input?.toLowerCase())
const { RangePicker } = DatePicker

const formatRecommendations = (text) => {
  const [intro, destinations, accommodations, note] = text?.split('\n\n')

  const formatList = (list) =>
    list
      ?.split('\n')
      ?.slice(1)
      ?.map((item) => item?.replace(/^\d+\.\s/, ''))

  return {
    intro,
    destinations: formatList(destinations),
    accommodations: formatList(accommodations),
    note,
  }
}

const Recommendations = ({ recommendations }) => {
  const { intro, destinations, accommodations, note } = formatRecommendations(recommendations)

  return (
    <div className="container mx-auto p-4">
      <h2 className="mb-4 text-xl font-bold">{intro}</h2>

      <ol className="mb-4 list-inside list-disc">
        {destinations?.map((destination, index) => (
          <li key={index}>{destination}</li>
        ))}
      </ol>

      <ol className="mb-4 list-inside list-disc">
        {accommodations?.map((accommodation, index) => (
          <li key={index}>{accommodation}</li>
        ))}
      </ol>

      <p>{note}</p>
    </div>
  )
}
export default function HomePage() {
  const [menu, setMenu] = useState(false)
  const [input, setInput] = useState()
  const { data: session } = useSession()
  const [value, setValue] = useState('')
  const [click, setClick] = useState(false)

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, '') // Remove non-numeric characters
    const numericValue = inputValue ? parseInt(inputValue, 10) : 0
    setValue(formatRupiah(numericValue))
    setInput({ ...input, budget: formatRupiah(numericValue) })
  }
  const handleDateChange = (dates) => {
    if (dates && dates.length === 2) {
      const formattedDates = dates.map((date) => (date ? date.format('YYYY-MM-DD') : null))
      setInput({
        ...input,
        startDate: formattedDates[0],
        endDate: formattedDates[1],
      })
    } else {
      console.log(null)
    }
  }

  const { mutate: HomeRecommendation, data, isLoading } = useHomeRecomendation()
  const { mutate: CustomPromptMakanan, data: dataMakanan } = useCustomPrompt()
  const { mutate: CustomPromptHotel, data: dataHotel } = useCustomPrompt()
  const ReccomendationButton = () => {
    HomeRecommendation(input)
    CustomPromptMakanan({
      prompt: `Berikan rekomendasi makanan untuk daerah ${input.location} dengan budget ${input.budget} dari tanggal ${input.startDate} hingga ${input.endDate} beserta tempat penginapannya.`,
    })
    CustomPromptHotel({
      prompt: `Berikan rekomendasi hotel untuk daerah ${input.location} dengan budget ${input.budget} dari tanggal ${input.startDate} hingga ${input.endDate} beserta tempat penginapannya.`,
    })
    setClick(true)
  }

  return (
    <div className="relative h-full min-h-screen w-full bg-background px-3">
      <div className="no-scrollbar flex h-screen w-full flex-col overflow-y-auto pb-12">
        <div className="mt-3 flex w-full flex-row justify-between">
          <p>Hi, {session?.user?.name}</p>
          <div className="relative">
            <button type="button" onClick={() => setMenu(!menu)}>
              <IoMdMenu className="h-5 w-5" />
            </button>
            {menu && (
              <button
                onClick={() => signOut()}
                type="button"
                className="absolute right-0 top-[100%] z-50 w-24 justify-center rounded bg-red-800 px-3 py-2 text-center text-white hover:bg-red-700"
              >
                Sign Out
              </button>
            )}
          </div>
        </div>
        <Select
          className="mt-3 w-full"
          showSearch
          onChange={(e) =>
            setInput({
              ...input,
              location: e,
            })
          }
          placeholder="Pilih tempat"
          optionFilterProp="children"
          filterOption={filterOption}
          options={[
            {
              value: 'Yogyakarta',
              label: 'Yogyakarta',
            },
            {
              value: 'Solo',
              label: 'Solo',
            },
          ]}
        />
        <RangePicker format="YYYY-MM-DD" onChange={handleDateChange} className="mt-3 w-full" />
        <div className="mt-3 flex w-full flex-row gap-2 text-black">
          <input
            className="w-full rounded-md px-3 py-1 text-sm"
            placeholder="Budget"
            type="text" // Change to text to handle formatted value
            value={value}
            onChange={handleInputChange}
          />
        </div>
        <button
          onClick={ReccomendationButton}
          className="mt-3 w-full rounded-xl bg-main px-3 py-2 text-white"
          type="buttton"
        >
          Mulai Petualangan
        </button>

        {click && !data ? (
          <LuLoader2 className="mx-auto mt-10 h-10 w-10 animate-spin text-main" />
        ) : (
          <>
            {data && (
              <div className="mt-3">
                <p className="text-lg font-medium text-text">Rekomendasi Wisata</p>
                <div className=" flex flex-row rounded-md border px-3 py-2">
                  <Recommendations recommendations={data} />
                </div>
              </div>
            )}
            {dataHotel && (
              <div className="mt-3">
                <p className="text-lg font-medium text-text">Rekomendasi Hotel</p>
                <div className=" flex flex-row rounded-md border px-3 py-2">
                  <Recommendations recommendations={dataHotel} />
                </div>
              </div>
            )}
            {dataMakanan && (
              <div className="mt-3">
                <p className="text-lg font-medium text-text">Rekomendasi Makanan</p>
                <div className=" flex flex-row rounded-md border px-3 py-2">
                  <Recommendations recommendations={dataMakanan} />
                </div>
              </div>
            )}
          </>
        )}
      </div>
      <div className="absolute bottom-0 w-full">
        <BottomBar />
      </div>
    </div>
  )
}
