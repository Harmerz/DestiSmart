import { getServerSession, NextAuthOptions } from 'next-auth'
import Credentials from 'next-auth/providers/credentials'
import NextAuth from 'next-auth/react'

import { axios } from '@/lib/axios'
import {
  ACCESS_TOKEN_EXP_AUTH_OPTION_IN_MS,
  REFRESH_TOKEN_EXP_AUTH_OPTION_IN_MS,
} from '@/lib/const'

import { refreshAccessToken } from './lib/refreshAccessToken'

export const authOption: NextAuthOptions = {
  providers: [
    Credentials({
      id: 'credentials',
      name: 'Credentials',
      credentials: {
        identifier: { label: 'Identifier', type: 'text', placeholder: 'Identifier' },
        password: { label: 'Password', type: 'password', placeholder: 'Password' },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(
            '/user/signin',
            {
              identifier: credentials?.identifier,
              password: credentials?.password,
            },
            {
              headers: {
                'Content-Type': 'application/json',
              },
            },
          )
          /* eslint-disable */
          const data = res.data
          console.log(data)

          if (!data.user.isVerified) {
            throw new Error(
              JSON.stringify({
                error: 'ACCOUNT_NOT_ACTIVED',
                message: 'You account has not been activated',
                username: data.user.username ?? data.user.email,
                isVerified: data.user.isVerified,
              }),
            )
          }

          const role = data.role

          return {
            id: data.user._id,
            name: data.user.name,
            email: data.user.email,
            username: data.user.username ?? data.user.email,
            role,
            refreshToken: data.user.refreshToken,
            refreshTokenExpires: Date.now() + REFRESH_TOKEN_EXP_AUTH_OPTION_IN_MS,
            accessToken: data.user.verificationToken,
            accessTokenExpires: Date.now() + ACCESS_TOKEN_EXP_AUTH_OPTION_IN_MS,
          }
        } catch (err) {
          // console.log(err)
          // Backend is NOT okay, so we directly throw the error from backend
          const errMessage = (err as any).response
          if (errMessage) {
            throw new Error(JSON.stringify({ message: errMessage.data.message }))
          }
          // Backend is ok, but we have filter something that has to be error (like account not activated)
          else {
            throw new Error((err as any).message)
          }
        }
      },
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: 7 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user }) {
      console.log(user)
      if (user) return true
      return false
    },
    async jwt({ token, user }: { token: any; user: any }) {
      console.log(Date.now(), token.accessTokenExpires, token.refreshTokenExpires)
      if (user) {
        return {
          ...token,
          username: user.username,
          role: user.role,
          accessToken: user.accessToken,
          accessTokenExpires: user.accessTokenExpires,
          refreshToken: user.refreshToken,
          refreshTokenExpires: user.refreshTokenExpires,
        }
      }
      // Sign out if the refresh token has expired
      if (Date.now() > token.refreshTokenExpires) {
        await NextAuth?.signOut() // Ensure you have imported NextAuth correctly
        return // Stop further execution as sign-out is processed
      }
      if (
        Date.now() > token.accessTokenExpires ||
        token.accessToken === 'RefreshAccessTokenError'
      ) {
        return {
          ...token,
          accessTokenExpires: Date.now() + ACCESS_TOKEN_EXP_AUTH_OPTION_IN_MS, // expand access token expire
          accessToken: await refreshAccessToken(token.refreshToken),
        }
      }

      return token
    },
    async session({ session, token }) {
      return {
        ...session,
        user: {
          ...session.user,
          name: token.name,
          email: token.email,
          username: token.username,
          role: token.role,
          accessToken: token.accessToken,
          // permission: permissionData,
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
    signIn: '/signin',
  },
}

export const getServerAuthSession = () => getServerSession(authOption)
