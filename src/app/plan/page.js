'use client'

import plan from './plan.json'
import { useState, useEffect } from 'react'
import { BottomBar } from '@/components/bottomBar'

function CheckBox({ name }) {
  const [check, setCheck] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedValue = localStorage.getItem(name)
      if (storedValue !== null) {
        setCheck(JSON.parse(storedValue))
      }
    }
  }, [name])

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(name, JSON.stringify(check))
    }
  }, [check, name])

  const toggleCheck = () => {
    setCheck((prevCheck) => !prevCheck)
  }

  return (
    <button onClick={toggleCheck} className="flex flex-row items-center gap-2">
      <input type="checkbox" checked={check} readOnly />
      {check ? <s className="text-start">{name}</s> : <p className="text-start">{name}</p>}
    </button>
  )
}

export default function PlanPage() {
  return (
    <div className="w-full overflow-y-auto bg-background">
      <BottomBar />
      <div className="border-b border-white px-3 py-2 text-lg font-medium text-white">
        Rencana Wisata
      </div>
      <div className="w-full flex-1 px-4">
        {Object.entries(plan['Perempuan']).map(([key, items]) => (
          <div key={key}>
            <div className="mb-2 mt-3 flex w-full border-b text-lg font-medium">{key}</div>
            <div className=" grid grid-cols-2 gap-y-2">
              {items.map((item, index) => (
                <CheckBox key={index} name={item} />
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
