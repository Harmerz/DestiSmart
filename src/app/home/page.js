'use client'

import { IoMdMenu } from 'react-icons/io'
import { BottomBar } from '@/components/bottomBar'
import { Select, DatePicker } from 'antd'
import { useState } from 'react'
import { signOut, useSession } from 'next-auth/react'

const formatRupiah = (number) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
  }).format(number)
}

const filterOption = (input, option) =>
  (option?.label ?? '').toLowerCase().includes(input.toLowerCase())
const { RangePicker } = DatePicker
export default function HomePage() {
  const [menu, setMenu] = useState(false)
  const { data: session } = useSession()
  const [value, setValue] = useState('')

  const handleInputChange = (e) => {
    const inputValue = e.target.value.replace(/\D/g, '') // Remove non-numeric characters
    const numericValue = inputValue ? parseInt(inputValue, 10) : 0
    setValue(formatRupiah(numericValue))
  }
  return (
    <div className="relative h-full min-h-screen w-full bg-background px-3">
      <div className="h-full w-full flex-col">
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
        <RangePicker className="mt-3 w-full" />
        <div className="mt-3 flex w-full flex-row gap-2 text-black">
          <input
            className="w-full rounded-md px-3 py-1 text-sm"
            placeholder="Budget"
            type="text" // Change to text to handle formatted value
            value={value}
            onChange={handleInputChange}
          />
        </div>
        <button className="mt-3 w-full rounded-xl bg-main px-3 py-2 text-white" type="buttton">
          Mulai Petualangan
        </button>
        <div className="mt-3">
          <p className="text-lg font-medium text-text">Rekomendasi Wisata</p>
          <div className=" flex flex-row rounded-md border px-3 py-2">
            <p>lorem</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-lg font-medium text-text">Rekomendasi Hotel</p>
          <div className=" flex flex-row rounded-md border px-3 py-2">
            <p>lorem</p>
          </div>
        </div>
        <div className="mt-3">
          <p className="text-lg font-medium text-text">Rekomendasi Makanan</p>
          <div className=" flex flex-row rounded-md border px-3 py-2">
            <p>lorem</p>
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 w-full">
        <BottomBar />
      </div>
    </div>
  )
}
