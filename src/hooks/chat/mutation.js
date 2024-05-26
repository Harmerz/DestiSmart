import { useAccessToken } from '@/hooks/auth'
import { useApiMutation2 } from '@/hooks/useApiMutation'
import { axios } from '@/lib/axios'

export const useSendMessages = () => {
  const { accessToken, headers, id } = useAccessToken()

  return useApiMutation2({
    queryKey: ['/api/v1/chat/send-message'],
    mutationFun: async (_, data) => {
      if (!accessToken) {
        return null
      }
      const res = await axios.post(
        '/api/v1/chat/send-message',
        {
          senderID: id,
          ...data,
        },
        {
          headers,
        },
      )
      return res?.data
    },
  })
}

export const useCreateConversation = () => {
  const { accessToken, headers, id } = useAccessToken()
  return useApiMutation2({
    queryKey: ['/api/v1/chat/create-conversation/', id],
    mutationFun: async (_, data) => {
      if (!accessToken) {
        return null
      }
      const res = await axios.post(`/api/v1/chat/create-conversation/${id}`, data, {
        headers,
      })
      return res?.data
    },
  })
}

export const useHomeRecomendation = () => {
  const { accessToken, headers, id } = useAccessToken()
  return useApiMutation2({
    queryKey: ['/api/v1/chat/tourism-recommendation', id],
    mutationFun: async (_, data) => {
      if (!accessToken) {
        return null
      }

      const res = await axios.post(
        '/api/v1/chat/tourism-recommendation',
        {
          senderID: id,
          ...data,
        },
        {
          'Content-Type': 'multipart/form-data',
          headers,
        },
      )
      return res?.data?.data
    },
  })
}

export const useCustomPrompt = () => {
  const { accessToken, headers, id } = useAccessToken()
  return useApiMutation2({
    queryKey: ['/api/v1/chat/custom-prompt'],
    mutationFun: async (_, data) => {
      if (!accessToken) {
        return null
      }
      const res = await axios.post(
        '/api/v1/chat/custom-prompt',
        {
          senderID: id,
          ...data,
        },
        {
          headers,
        },
      )
      return res?.data?.data
    },
  })
}

export default useCustomPrompt
