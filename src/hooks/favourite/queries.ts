import { useQuery } from '@tanstack/react-query'

import { useAccessToken } from '@/hooks/auth'
import { axios } from '@/lib/axios'

export const useGetFav = () => {
  const { accessToken, headers } = useAccessToken()
  return useQuery({
    queryKey: ['/sounds/getfav'],
    queryFn: async () => {
      const res = await axios.get(`/fav/getfav`, {
        headers,
      })
      return res.data
    },
    staleTime: 15 * 60 * 1000,
    enabled: !!accessToken,
  })
}
