import { Button, Navbar } from '@/components/elements'

export default function DiscoverPage() {
  return (
    <div className="h-full min-h-screen w-full bg-blue-900 pb-20">
      <Navbar />
      <div className="mt-10 flex w-full justify-center">
        <div className="flex w-full flex-col items-center justify-center">
          <p className="text-2xl font-bold">Upload your own sounds!</p>
          <div className="mt-5 flex w-full max-w-[426px] flex-col gap-6 rounded bg-blue-700 p-6">
            <div className="flex w-full flex-col gap-2">
              <p>Name</p>
              <input type="text" className="w-full rounded-md bg-[#1C2133] px-3 py-2" />
            </div>
            <div className="flex w-full flex-col gap-2">
              <p>Sound (mp3/wav)</p>

              <input
                className="block w-full cursor-pointer rounded-lg bg-[#1C2133] text-[#606989] outline-none focus:outline-none"
                id="large_size"
                type="file"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <p>Image</p>
              <input
                className="block w-full cursor-pointer rounded-lg bg-[#1C2133] text-[#606989] outline-none focus:outline-none"
                id="large_size"
                type="file"
              />
            </div>
            <div className="flex w-full flex-col gap-2">
              <p>Description</p>
              <textarea className="w-full rounded-md bg-[#1C2133] px-3 py-2" />
            </div>
            <div className="flex w-full flex-col gap-2">
              <p>Category</p>
              <input type="text" className="w-full rounded-md bg-[#1C2133] px-3 py-2" />
            </div>
            <div className="flex w-full flex-col gap-2">
              <p>Tags</p>
              <input type="text" className="w-full rounded-md bg-[#1C2133] px-3 py-2" />
            </div>
            <Button type="primary">Button</Button>
          </div>
        </div>
      </div>
    </div>
  )
}
