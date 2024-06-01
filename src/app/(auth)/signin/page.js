'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { useState } from 'react'

export default function SignInHome() {
  const router = useRouter()
  const [wrong, setWrong] = useState('')
  const onFinish = async (e) => {
    e.preventDefault()
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: e?.target[0]?.value,
        password: e?.target[1]?.value,
      })
      if (!res?.error) {
        router.refresh()
      } else {
        setWrong(JSON.parse(res?.error).message)
        setTimeout(() => {
          setWrong('')
        }, 3000)
      }
    } catch (err) {
      throw console.error(err)
    }
  }
  return (
    <div className="flex min-h-screen w-full flex-row">
      <div className="relative hidden h-full grow md:block">
        <div className="absolute z-10 flex h-full w-full bg-black bg-opacity-40" />
        <Image src="/assets/tugu-home.jpg" className="z-0 object-cover" fill alt="Tugu" />
      </div>
      <div className="flex h-full w-full grow-0 flex-col items-center justify-center bg-background px-16 md:max-w-md">
        <div className="relative aspect-square w-1/2 md:w-4/5">
          <Image src="/assets/DestiSmart.png" fill alt="Logo" />
        </div>
        <h1 className="mt-4 text-4xl font-medium text-main">DestiSmart</h1>
        <p className="mt-10 text-text">
          Fun fact !!
          <br />
          Menurut BPS, Indonesia memiliki 2930 usaha objek daya tarik wisata (ODTW) pada 2022
        </p>
        <form onSubmit={onFinish} className="mt-20 flex w-full flex-col gap-5">
          <input
            required
            placeholder="email"
            type="email"
            className="w-full rounded-full border bg-transparent px-3 py-2"
          />
          <input
            required
            placeholder="password"
            type="password"
            className="w-full rounded-full border bg-transparent px-3 py-2"
          />
          {wrong !== '' && <div className="-mb-4 -mt-4 text-sm text-red-600">{wrong}</div>}
          <button className="rounded-full bg-main px-3 py-2 text-xl text-white" type="submit">
            Masuk
          </button>
          <p className="text-md -mt-3">
            Belum Punya Akun?{' '}
            <Link href="/signup">
              <span className="text-main">Registrasi di sini</span>
            </Link>
          </p>
        </form>
      </div>
    </div>
  )
}
