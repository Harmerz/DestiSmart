'use client'

import { useQuery } from '@tanstack/react-query'

import { useAccessToken } from '@/hooks/auth'
import { axios } from '@/lib/axios'

export const useGetConversation = (idChat) => {
  const { accessToken, headers, id } = useAccessToken()
  return useQuery({
    queryKey: ['/api/v1/chat/get-conversation/', idChat], // Include idChat in queryKey
    queryFn: async () => {
      const res = await axios.get(`/api/v1/chat/get-conversation/${idChat}`, {
        headers,
      })
      return res?.data?.data
    },
    staleTime: 15 * 60 * 1000,
    enabled: !!accessToken && !!idChat,
  })
}

export const useGetListConversation = () => {
  const { accessToken, headers, id } = useAccessToken()

  return useQuery({
    queryKey: ['/api/v1/chat/list-conversations/'],
    queryFn: async () => {
      const res = await axios.get(`/api/v1/chat/list-conversations/${id}`, {
        headers,
      })
      return res.data.data
    },
    staleTime: 15 * 60 * 1000,
    enabled: !!accessToken,
  })
}

export const useGetListLocation = (params) => {
  const { accessToken, headers, id } = useAccessToken()

  return useQuery({
    queryKey: ['/api/v1/chat/list-conversations/', params],
    queryFn: async () => {
      const res = await axios.get(`/api/v1/distance`, {
        headers,
        params, // Include params in the config object
      })
      return res.data
    },
    staleTime: 15 * 60 * 1000,
    enabled: !!accessToken && !!params,
  })
}

export default useGetListConversation
