'use client'

// import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
// import { ReactQueryDevtools } from '@tanstack/react-query-devtools'
// import { ReactQueryStreamedHydration } from '@tanstack/react-query-next-experimental'
// import { useRouter } from 'next/navigation'
import { SessionProvider as NextauthSessionProvider } from 'next-auth/react'
import React, { useEffect, useState } from 'react'

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

// function ReactQueryProviderWrapper({ children }: { children: React.ReactNode }) {
//   const router = useRouter()
//   const [client] = React.useState(
//     new QueryClient({
//       defaultOptions: {
//         queries: {
//           onError: (err: { status: number; statusText?: String }) => {
//             const error = err
//             /**
//              * When the error is because unauthorize. Then it because invalid access token.
//              * So, we need redirect user to sign-in page again
//              */
//             if (error.status === 401) {
//               signIn()
//             }
//             // If the error is not from server, then we need to refresh the page
//             else if (error.status && error.status < 500) {
//               router.refresh()
//             }
//           },
//         },
//         mutations: {
//           onError: (err: { status: number; statusText?: String }) => {
//             const error = err
//             /**
//              * When the error is because unauthorize. Then it because invalid access token.
//              * So, we need redirect user to sign-in page again
//              */
//             if (error.status === 401) {
//               signIn()
//             }
//             // If the error is not from server, then we need to refresh the page
//             else if (error.status && error.status < 500) {
//               router.refresh()
//             }
//           },
//         },
//       },
//     }),
//   )

//   return (
//     <QueryClientProvider client={client}>
//       <ReactQueryStreamedHydration>{children}</ReactQueryStreamedHydration>
//       {process.env.NODE_ENV === 'development' && <ReactQueryDevtools initialIsOpen={false} />}
//     </QueryClientProvider>
//   )
// }

export function Providers({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)
  useEffect(() => {
    setMounted(true)
  }, [])
  if (!mounted) {
    return null
  }
  return <NextauthSessionProviderWrapper>{children}</NextauthSessionProviderWrapper>
}

export default Providers
