import { AxiosRequestConfig } from 'axios'

import { useAccessToken } from '@/hooks/auth'
import { useApiMutation2 } from '@/hooks/useApiMutation'
import { axios } from '@/lib/axios'

const config: AxiosRequestConfig = {
  headers: {
    'Content-Type': 'application/json',
  },
}

export const useAddToFav = () => {
  const { accessToken, headers } = useAccessToken()
  return useApiMutation2({
    queryKey: ['/sounds/upload'],
    mutationFun: async (_, data) => {
      if (!accessToken) {
        return null
      }
      const res = await axios.post('/sounds/upload', data, {
        headers,
        ...config.headers,
      })
      return res?.data
    },
  })
}

export const useProcessQuestions = () => {
  const { accessToken, headers } = useAccessToken()
  return useApiMutation2({
    queryKey: ['questions'],
    mutationFun: async (_, data) => {
      if (!accessToken) {
        return null
      }
      const res = await axios.delete(`/sounds/delete/${data}`, {
        headers,
      })
      return res
    },
  })
}
