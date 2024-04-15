import { useAccessToken } from '@/hooks/store/auth'
import { useApiMutation2 } from '@/hooks/useApiMutation'
import { axios } from '@/lib/axios'

import { keys } from './keys'
import { TAddHotel, TAddOta } from './types'

export const useAddOta = () => {
  const { accessToken, headers } = useAccessToken()

  return useApiMutation2({
    queryKey: keys.ota,
    mutationFun: async (url, data: TAddOta) => {
      if (accessToken) {
        await axios.post(url, data, {
          headers,
        })
      }
    },
  })
}

export const useRemoveOta = () => {
  const { accessToken, headers } = useAccessToken()

  return useApiMutation2({
    queryKey: keys.ota,
    mutationFun: async (url, ota_id: number) => {
      if (accessToken) {
        await axios.delete(`${url}/${ota_id}`, {
          headers,
        })
      }
    },
  })
}

export const useAddHotel = () => {
  const { accessToken, headers } = useAccessToken()

  return useApiMutation2({
    queryKey: keys.hotel,
    mutationFun: async (url, data: TAddHotel) => {
      if (accessToken) {
        await axios.post(url, data, { headers })
      }
    },
  })
}
