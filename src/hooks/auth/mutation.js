import { useAccessToken } from '@/hooks/auth'
import { useApiMutation2 } from '@/hooks/useApiMutation'
import { axios } from '@/lib/axios'

export const useRegister = () => {
  const { accessToken, headers, id } = useAccessToken()

  return useApiMutation2({
    queryKey: ['/api/v1/auth/register'],
    mutationFun: async (_, data) => {
      if (!accessToken) {
        return null
      }
      const res = await axios.post('/api/v1/auth/register', data, {
        headers,
      })
      return res?.data
    },
  })
}

export default useRegister
