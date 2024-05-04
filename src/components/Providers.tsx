'use client'

import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
import { useRouter } from 'next/navigation'
import { SessionProvider as NextauthSessionProvider, signIn, useSession } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

import { setTokenApi } from '@/lib/axios'
import { ACCESS_TOKEN_EXP_AUTH_REVALIDATE } from '@/lib/const'

function NextauthSessionProviderWrapper({ children }: { children: React.ReactNode }) {
  // const [baseUrl, setBaseUrl] = useState('')
  // useEffect(() => {
  //   setBaseUrl(window.location.origin)
  // }, [baseUrl])
  return (
    // -3 is for error (ralat)
    <NextauthSessionProvider refetchInterval={ACCESS_TOKEN_EXP_AUTH_REVALIDATE}>
      {children}
    </NextauthSessionProvider>
  )
}

function SessionWrapper({ children }: { children: React.ReactNode }) {
  const { data: session, status } = useSession()
  const router = useRouter()

  /**
   * This is the case when there are JWT_SESSION_ERROR from nextauth
   * If the error is happen. Then we just need to reload it. And nextauth will redirect user to signin page
   */
  useEffect(() => {
    if (status === 'unauthenticated') {
      router.refresh()
    }
  }, [router, status])

  /**
   * This is used for send access token from nextauth to axios.
   * This code is deprecated because we use 'apiClient' over 'api'.
   * This will be remove in the future
   */
  useEffect(() => {
    if (status === 'authenticated') {
      setTokenApi(session?.user?.accessToken ?? '')
    }
  }, [session?.user?.accessToken, status])

  return children
}

interface ApiError extends Error {
  status?: number
}
function ReactQueryProviderWrapper({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [client] = useState(
    () =>
      new QueryClient({
        defaultOptions: {
          mutations: {
            onError: (err: ApiError) => {
              if (err.status === 401) {
                signIn() // Redirect user to sign-in page due to invalid access token
              } else if (err.status && err.status < 500) {
                router.refresh() // Refresh the page for other client-side errors
              }
            },
          },
        },
      }),
  )
  return (
    <QueryClientProvider client={client}>
      <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
      {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
    </QueryClientProvider>
  )
}

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }
  return (
    <NextauthSessionProviderWrapper>
      <SessionWrapper>
        <ReactQueryProviderWrapper>{children}</ReactQueryProviderWrapper>
      </SessionWrapper>
    </NextauthSessionProviderWrapper>
  )
}

export default Providers
