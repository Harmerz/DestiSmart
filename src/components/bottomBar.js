import { IoMdHome } from 'react-icons/io'
import { FaMapLocation, FaCalendarCheck } from 'react-icons/fa6'
import { IoChatbubbleEllipses, IoHomeSharp } from 'react-icons/io5'
import Link from 'next/link'

export function BottomBar() {
  return (
    <div className="fixed bottom-0 z-20 grid w-full max-w-[414px] grid-cols-4 justify-center bg-background">
      <Link href="/home">
        <div className="flex w-full justify-center py-3">
          <IoHomeSharp className="h-6 w-6" />
        </div>
      </Link>
      <Link href="/map">
        <div className="flex w-full justify-center py-3">
          <FaMapLocation className="h-6 w-6" />
        </div>
      </Link>
      <Link href="/plan">
        <div className="flex w-full justify-center py-3">
          <FaCalendarCheck className="h-6 w-6" />
        </div>
      </Link>
      <Link href="/chat">
        <div className="flex w-full justify-center py-3">
          <IoChatbubbleEllipses className="h-6 w-6" />
        </div>
      </Link>
    </div>
  )
}

export default BottomBar
