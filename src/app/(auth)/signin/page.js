'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { signIn } from 'next-auth/react'

export default function SignInHome() {
  const router = useRouter()
  const onFinish = async (e) => {
    e.preventDefault()
    try {
      const res = await signIn('credentials', {
        redirect: false,
        email: e?.target[0]?.value,
        password: e?.target[1]?.value,
      })
      console.log(res)
      if (!res?.error) {
        router.refresh()
      }
    } catch (err) {
      throw console.error(err)
    }
  }
  return (
    <div className="flex w-full flex-col items-center justify-center bg-background px-16">
      <div className="relative aspect-square w-4/5">
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
        <button className="rounded-full bg-main px-3 py-2 text-xl text-white" type="submit">
          Masuk
        </button>
        <p className="text-md -mt-3">
          Belum Punya Akun?{' '}
          <Link href="/signup">
            <span className="text-main">Regristasi di sini</span>
          </Link>
        </p>
      </form>
    </div>
  )
}
