'use client'

import Image from 'next/image'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useSession } from 'next-auth/react'

import { Button } from './button'

export function Navbar() {
  const { data: session } = useSession()
  const pathname = usePathname()
  const route = [
    {
      name: 'Discover',
      path: '/discover',
    },
    {
      name: 'My Sound',
      path: '/my-sound',
    },
    {
      name: 'Favourite',
      path: '/favourite',
    },
  ]
  return (
    <div className="flex w-full flex-row justify-between bg-blue-900 px-16 py-6">
      <div>Logo</div>
      <div className="flex flex-row justify-center gap-3">
        {route.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className={
              pathname === item.path ? 'rounded bg-[#1C2133]' : 'rounded hover:bg-[#1C2133]'
            }
          >
            <div className="px-4 py-1">{item.name}</div>
          </Link>
        ))}
        <Link href="/upload">
          <Button type="primary">+ Upload</Button>
        </Link>
      </div>
      <div className="flex flex-row items-center justify-center gap-2">
        <div className="relative h-7 w-7">
          <Image src="/images/era.png" fill className="rounded-full" alt="profil" />
        </div>
        Hi, {session?.user?.name}
      </div>
    </div>
  )
}
export default Navbar
