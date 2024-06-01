import { IoMdHome } from 'react-icons/io'
import { FaMapLocation, FaCalendarCheck } from 'react-icons/fa6'
import { IoChatbubbleEllipses, IoHomeSharp } from 'react-icons/io5'
import Link from 'next/link'

export function BottomBar() {
  return (
    <div className="z-20 grid w-full grid-cols-4 justify-center border-t bg-background">
      <Link href="/home">
        <div className="flex w-full items-center justify-center py-3 sm:gap-2">
          <IoHomeSharp className="h-6 w-6" />
          <p className="hidden sm:block">Home</p>
        </div>
      </Link>
      <Link href="/map">
        <div className="flex w-full items-center justify-center py-3 sm:gap-2">
          <FaMapLocation className="h-6 w-6" />
          <p className="hidden sm:block">Location</p>
        </div>
      </Link>
      <Link href="/plan">
        <div className="flex w-full items-center justify-center py-3 sm:gap-2">
          <FaCalendarCheck className="h-6 w-6" />
          <p className="hidden sm:block">Plan</p>
        </div>
      </Link>
      <Link href="/chat">
        <div className="flex w-full items-center justify-center py-3 sm:gap-2">
          <IoChatbubbleEllipses className="h-6 w-6" />
          <p className="hidden sm:block">Chat</p>
        </div>
      </Link>
    </div>
  )
}

export default BottomBar
