import { AxiosHeaderValue } from 'axios'
import { useSession } from 'next-auth/react'

export type Headers = {
  Authorization: AxiosHeaderValue
}

export const useIsAuth = () => {
  const { status } = useSession()
  return {
    isAuth: status === 'authenticated',
    isAuthLoading: status === 'loading',
  }
}

export const useAccessToken = () => {
  const { data: session } = useSession()
  const accessToken = session?.user?.accessToken

  const headers: Headers = {
    Authorization: `Bearer ${accessToken}`,
  }

  return { accessToken, headers }
}

export const useUsername = () => {
  const { data: session } = useSession()
  const username = session?.user?.username

  return username
}
