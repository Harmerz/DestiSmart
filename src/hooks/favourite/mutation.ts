import { useQueryClient } from '@tanstack/react-query'

import { useAccessToken } from '@/hooks/auth'
import { useApiMutation2 } from '@/hooks/useApiMutation'
import { axios } from '@/lib/axios'

export const useAddToFavourite = () => {
  const { accessToken, headers } = useAccessToken()
  const queryClient = useQueryClient()

  return useApiMutation2({
    queryKey: ['/fav/add'],
    mutationFun: async (_, soundId) => {
      if (!accessToken) {
        return null
      }
      const res = await axios.post(
        `/fav/addtofavourite/${soundId}`,
        {},
        {
          headers,
        },
      )
      return res?.data
    },
    options: {
      onSuccess: () => {
        // Invalidate and refetch 'atensis' query
        queryClient.invalidateQueries({ queryKey: ['/sounds/getfav'] })
      },
      // ... other options ...
    },
  })
}

export const useDelFromFavourite = () => {
  const { accessToken, headers } = useAccessToken()
  const queryClient = useQueryClient()

  return useApiMutation2({
    queryKey: ['/fav/delete'],
    mutationFun: async (_, soundId) => {
      if (!accessToken) {
        return null
      }
      const res = await axios.post(
        `/fav/deletefromfav/${soundId}`,
        {},
        {
          headers,
        },
      )
      return res?.data
    },
    options: {
      onSuccess: () => {
        // Invalidate and refetch 'atensis' query
        queryClient.invalidateQueries({ queryKey: ['/sounds/getfav'] })
      },
      // ... other options ...
    },
  })
}
