import { useQuery } from '@tanstack/react-query'

import { useAccessToken } from '@/hooks/auth'
import { axios } from '@/lib/axios'

export const useGetOneSoundById = (soundId: string) => {
  const { accessToken, headers } = useAccessToken()
  return useQuery({
    queryKey: ['/sounds/getonesound'],
    queryFn: async () => {
      const res = await axios.get(`/sounds/getonesound/${soundId}`, {
        headers,
      })
      return res.data
    },
    staleTime: 15 * 60 * 1000,
    enabled: !!accessToken,
  })
}

export const useGetSoundByOwner = () => {
  const { accessToken, headers } = useAccessToken()
  return useQuery({
    queryKey: ['/sounds/getsounds'],
    queryFn: async () => {
      const res = await axios.get(`/sounds/getsounds`, {
        headers,
      })
      return res.data
    },
    staleTime: 15 * 60 * 1000,
    enabled: !!accessToken,
  })
}

export const useGetAllSounds = () => {
  const { accessToken, headers } = useAccessToken()
  return useQuery({
    queryKey: ['/sounds/getallsound'],
    queryFn: async () => {
      const res = await axios.get(`/sounds/getallsound`, {
        headers,
      })
      return res.data
    },
    staleTime: 15 * 60 * 1000,
    enabled: !!accessToken,
  })
}
