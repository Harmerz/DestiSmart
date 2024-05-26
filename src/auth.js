import Credentials from 'next-auth/providers/credentials'

import { axios } from '@/lib/axios'
import { ACCESS_TOKEN_EXP_AUTH_OPTION_IN_MS } from '@/lib/const'
import { refreshAccessToken } from '@/lib/refreshAccessToken'

export const options = {
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email', placeholder: 'Email' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            '/api/v1/auth/login',
            {
              email: credentials?.email,
              password: credentials?.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          const { data } = res
          return {
            id: data.user._id,
            email: data.user.email,
            name: data.user.firstName + data.user.lastName,
            accessToken: data.token,
            accessTokenExpires: Date.now() + ACCESS_TOKEN_EXP_AUTH_OPTION_IN_MS,
          }
        } catch (err) {
          console.log(err)
          // Backend is NOT okay, so we directly throw the error from backend
          const errMessage = err.response
          if (errMessage) {
            throw new Error(JSON.stringify({ message: errMessage.data.message }))
          }
          // Backend is ok, but we have filter something that has to be error (like account not activated)
          else {
            throw new Error(err.message)
          }
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user }) {
      if (user) return true
      return false
    },
    async jwt({ token, user }) {
      // Initial sign in

      if (user) {
        return {
          ...token,
          id: user.id,
          name: user.name,
          email: user.email,
          accessToken: user.accessToken,
          accessTokenExpires: user.accessTokenExpires,
        }
      }

      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          id: token.id,
          name: token.name,
          email: token.email,
          accessToken: token.accessToken,
        },
      }
    },
  },
  cookies: {
    sessionToken: {
      name: 'next-auth.session-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    callbackUrl: {
      name: 'next-auth.callback-url',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
    csrfToken: {
      name: 'next-auth.csrf-token',
      options: {
        httpOnly: true,
        sameSite: 'lax',
        path: '/',
        secure: true,
      },
    },
  },
  pages: {
    signIn: '/auth/signin',
    newUser: '/welcome',
  },
}

export default options
