'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'

import { Button } from './button'

export function Navbar() {
  const pathname = usePathname()
  const route = [
    {
      name: 'Discover',
      path: '/discover',
    },
    {
      name: 'My Sound',
      path: 'my-sound',
    },
    {
      name: 'Favourite',
      path: 'favourite',
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
        <Button type="primary">+ Upload</Button>
      </div>
      <div>Hi Hiera</div>
    </div>
  )
}
export default Navbar
