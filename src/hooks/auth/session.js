import { useSession } from 'next-auth/react'

export const useAccessToken = () => {
  const { data: session } = useSession()
  const accessToken = session?.user?.accessToken
  const id = session?.user?.id
  const headers = {
    Authorization: `Bearer ${accessToken}`,
  }

  return { accessToken, headers, id }
}

export const useUsername = () => {
  const { data: session } = useSession()
  const name = session?.user?.name

  return name
}
