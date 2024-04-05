'use client'

import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

import { Button } from '@/components/elements'

export default function SigninPages() {
  const router = useRouter()
  const [form, setForm] = useState<{
    identifier: String
    password: String
  }>({
    identifier: '',
    password: '',
  })
  const onFinish = async () => {
    try {
      const res = await signIn('credentials', {
        redirect: false,
        identifier: form?.identifier,
        password: form?.password,
      })
      if (!res?.error) {
        router.refresh()
      }
    } catch (err) {
      // eslint-disable-next-line @typescript-eslint/no-throw-literal
      throw console.error(err)
    }
  }
  return (
    <div className="h-full min-h-screen w-full bg-blue-900 pb-20 pt-20">
      <div className="flex w-full justify-center">
        <div className="flex w-full flex-col items-center justify-center">
          <p className="text-2xl font-bold">Login</p>
          <div className="mt-5 flex w-full max-w-[426px] flex-col gap-6 rounded bg-blue-700 p-6">
            <div className="flex w-full flex-col gap-2">
              <p>Username</p>
              <input
                type="text"
                className="w-full rounded-md bg-[#1C2133] px-3 py-2"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    identifier: e.target.value,
                  }))
                }
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <p>Password</p>
              <input
                type="password"
                className="w-full rounded-md bg-[#1C2133] px-3 py-2"
                onChange={(e) =>
                  setForm((prev) => ({
                    ...prev,
                    password: e.target.value,
                  }))
                }
              />
            </div>

            <Button type="primary" onClick={onFinish}>
              Login
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
