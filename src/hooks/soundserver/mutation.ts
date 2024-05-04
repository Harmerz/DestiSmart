import { AxiosRequestConfig } from 'axios'

import { useAccessToken } from '@/hooks/auth'
import { useApiMutation2 } from '@/hooks/useApiMutation'
import { axios } from '@/lib/axios'

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'multipart/form-data',
  },
}

export const useNewSounds = () => {
  const { accessToken, headers } = useAccessToken()
  return useApiMutation2({
    queryKey: ['/sounds/upload'],
    mutationFun: async (_, data: FormData) => {
      if (!accessToken) {
        return null
      }
      const res = await axios.post('/sounds/upload', data, {
        ...config.headers,
        headers,
      })
      return res?.data
    },
  })
}

export const useDeleteSounds = () => {
  const { accessToken, headers } = useAccessToken()
  return useApiMutation2({
    queryKey: ['questions'],
    mutationFun: async (_, soundId) => {
      if (!accessToken) {
        return null
      }
      const res = await axios.delete(`/sounds/delete/${soundId}`, {
        headers,
      })
      return res
    },
  })
}
