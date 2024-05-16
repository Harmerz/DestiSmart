'use client'

import { notification } from 'antd'
import { useRouter } from 'next/navigation'
import { useCallback, useEffect, useState } from 'react'

import { Button, Navbar } from '@/components/elements'
import { useNewSounds } from '@/hooks/soundserver'

type DataUpload = {
  title?: string
  description?: string
  tags?: string
  sound?: File
  image?: File
}

export default function UploadPage() {
  const [api, contextHolder] = notification.useNotification()
  const router = useRouter()

  const openNotificationWithIcon = useCallback(
    (title: string) => {
      api.success({
        message: 'Music Upload',
        description: `Berhasil Mengupload ${title}`,
      })
    },
    [api],
  )
  const [data, setData] = useState<DataUpload>({})
  const { mutate: UploadSound, isSuccess } = useNewSounds()
  const uploadFile = (e: any) => {
    e.preventDefault()
    const form = new FormData()
    form.append('title', data?.title ?? '')
    form.append('description', data?.description ?? '')
    form.append('sound', data?.sound ?? '')
    form.append('image', data?.image ?? '')
    form.append('tags', data?.tags ?? '')
    UploadSound(form)
  }
  useEffect(() => {
    if (isSuccess) {
      openNotificationWithIcon(data?.title ?? '')
      setTimeout(() => {
        router.push('/my-sound')
      }, 3000)
    }
  }, [data?.title, isSuccess, openNotificationWithIcon, router])

  return (
    <>
      {contextHolder}
      <div className="h-full min-h-screen w-full bg-blue-900 pb-20">
        <Navbar />
        <div className="mt-10 flex w-full justify-center">
          <div className="flex w-full flex-col items-center justify-center">
            <p className="text-2xl font-bold">Upload your own sounds!</p>
            <form
              onSubmit={uploadFile}
              className="mt-5 flex w-full max-w-[426px] flex-col gap-6 rounded bg-blue-700 p-6"
            >
              <div className="flex w-full flex-col gap-2">
                <p>Title</p>
                <input
                  onChange={(e) =>
                    setData({
                      ...data,
                      title: e?.target?.value,
                    })
                  }
                  type="text"
                  className="w-full rounded-md bg-[#1C2133] px-3 py-2"
                  required
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <p>Sound (mp3/wav)</p>

                <input
                  className="block w-full cursor-pointer rounded-lg bg-[#1C2133] text-[#606989] outline-none focus:outline-none"
                  id="large_size"
                  type="file"
                  accept=".mp3, .wav"
                  onChange={(e) =>
                    setData({
                      ...data,
                      sound: e!.target!.files![0],
                    })
                  }
                  required
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <p>Image (png/jpg)</p>
                <input
                  className="block w-full cursor-pointer rounded-lg bg-[#1C2133] text-[#606989] outline-none focus:outline-none"
                  id="large_size"
                  type="file"
                  accept=".png, .jpg"
                  onChange={(e) =>
                    setData({
                      ...data,
                      image: e!.target!.files![0],
                    })
                  }
                />
              </div>
              <div className="flex w-full flex-col gap-2">
                <p>Description</p>
                <textarea
                  onChange={(e) =>
                    setData({
                      ...data,
                      description: e.target.value,
                    })
                  }
                  className="w-full rounded-md bg-[#1C2133] px-3 py-2"
                />
              </div>
              {/* <div className="flex w-full flex-col gap-2">
              <p>Category</p>
              <input
              onChange={(e) =>
                setData({
                  ...data,
                  category: e.target.value,
                })
              }
              type="text"
              className="w-full rounded-md bg-[#1C2133] px-3 py-2"
              />
            </div> */}
              <div className="flex w-full flex-col gap-2">
                <p>Tags</p>
                <input
                  onChange={(e) =>
                    setData({
                      ...data,
                      tags: JSON.stringify([e.target.value]),
                    })
                  }
                  type="text"
                  className="w-full rounded-md bg-[#1C2133] px-3 py-2"
                />
              </div>
              <Button buttonType="submit" type="primary">
                Button
              </Button>
            </form>
          </div>
        </div>
      </div>
    </>
  )
}
