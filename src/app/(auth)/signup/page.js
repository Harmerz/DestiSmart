'use client'

import Image from 'next/image'
import { useEffect, useState } from 'react'
import { useRegister } from '@/hooks/auth'
import { useRouter } from 'next/navigation'
import Link from 'next/link'

export default function SignInHome() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    firstname: '',
    lastname: '',
    email: '',
    password: '',
    confirmPassword: '',
    gender: '',
  })
  const { mutate: Register, isSuccess } = useRegister()

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData({
      ...formData,
      [name]: value,
    })
  }
  useEffect(() => {
    if (isSuccess) router.push('/signin')
  }, [isSuccess])

  const handleSubmit = (e) => {
    e.preventDefault()
    // Validate form data
    if (formData.password !== formData.confirmPassword) {
      return
    }
    Register(formData)
  }
  return (
    <div className="flex min-h-screen w-full flex-row">
      <div className="relative grow">
        <div className="absolute z-10 h-full w-full bg-black bg-opacity-30" />
        <Image src="/assets/borobudur-home.png" alt="Borobudur" fill className="z-0 object-cover" />
      </div>
      <div className="no-scrollbar flex min-h-screen grow-0 flex-col items-center justify-center overflow-y-auto bg-background px-16 md:max-w-md">
        <div className="relative aspect-square w-1/2 md:w-4/5">
          <Image src="/assets/DestiSmart.png" fill alt="Logo" />
        </div>
        <h1 className="mt-4 text-4xl font-medium text-main">DestiSmart</h1>
        <p className="mt-10 text-text">
          Fun fact !!
          <br />
          Menurut BPS, Indonesia memiliki 2930 usaha objek daya tarik wisata (ODTW) pada 2022
        </p>
        <form onSubmit={handleSubmit} className="mt-10 flex w-full flex-col gap-5">
          <input
            required
            name="firstname"
            placeholder="First Name"
            type="text"
            className="w-full rounded-full border bg-transparent px-3 py-2"
            value={formData.firstname}
            onChange={handleChange}
          />
          <input
            required
            name="lastname"
            placeholder="Last Name"
            type="text"
            className="w-full rounded-full border bg-transparent px-3 py-2"
            value={formData.lastname}
            onChange={handleChange}
          />
          <input
            name="email"
            placeholder="email"
            type="email"
            className="w-full rounded-full border bg-transparent px-3 py-2"
            value={formData.email}
            onChange={handleChange}
          />
          <input
            required
            name="password"
            placeholder="password"
            type="password"
            className="w-full rounded-full border bg-transparent px-3 py-2"
            value={formData.password}
            onChange={handleChange}
          />
          <input
            required
            name="confirmPassword"
            placeholder="ulangi password"
            type="password"
            className="w-full rounded-full border bg-transparent px-3 py-2"
            value={formData.confirmPassword}
            onChange={handleChange}
          />
          {formData.password !== formData.confirmPassword &&
            formData.confirmPassword.length > 3 && (
              <div className="-mb-3 -mt-3">Password tidak sama</div>
            )}
          <div className="flex w-full flex-row justify-around">
            <div className="flex flex-row items-center gap-2">
              <input
                required
                type="radio"
                name="gender"
                value="male"
                checked={formData.gender === 'male'}
                onChange={handleChange}
              />
              Laki-laki
            </div>
            <div className="flex flex-row items-center gap-2">
              <input
                required
                type="radio"
                name="gender"
                value="female"
                checked={formData.gender === 'female'}
                onChange={handleChange}
              />
              Perempuan
            </div>
          </div>
          <button className="rounded-full bg-main px-3 py-2 text-xl text-white" type="submit">
            Masuk
          </button>
        </form>
        <p className="text-md mt-2">
          Sudah Punya Akun?{' '}
          <Link href="/signin">
            <span className="text-main">Masuk di sini</span>
          </Link>
        </p>
      </div>
    </div>
  )
}
