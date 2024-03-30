import { getServerSession, NextAuthOptions, Session } from 'next-auth'
import { JWT } from 'next-auth/jwt'
import Credentials from 'next-auth/providers/credentials'

import { axios } from '@/lib/axios'
import { ACCESS_TOKEN_EXP_AUTH_OPTION_IN_MS } from '@/lib/const'
import { refreshAccessToken } from '@/lib/refreshAccessToken'

export const authOption: NextAuthOptions = {
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
            '/auth/login',
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
          /* eslint-disable */
          const data = res.data.data

          if (!data.user.is_active) {
            throw new Error(
              JSON.stringify({
                error: 'ACCOUNT_NOT_ACTIVED',
                message: 'You account has not been activated',
                username: data.user.username ?? data.user.email,
                activated: data.user.is_active,
              }),
            )
          }

          const role = data.user.is_admin ? 'admin' : 'user'

          return {
            id: data.user._id,
            email: data.user.email,
            username: data.user.username ?? data.user.email,
            role,
            accessToken: data.access_token,
            refreshToken: data.refresh_token,
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
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  callbacks: {
    async signIn({ user }) {
      if (user) return true
      return false
    },
    async jwt({ token, user, trigger, session }) {
      if (user) {
        return {
          ...token,
          username: user.username,
          role: user.role,
          accessToken: user.accessToken,
          accessTokenExpires: user.accessTokenExpires,
          refreshToken: user.refreshToken,
          bridgeStatus: user.bridgeStatus,
        }
      }

      if (Date.now() > token.accessTokenExpires) {
        return {
          ...token,
          accessTokenExpires: Date.now() + ACCESS_TOKEN_EXP_AUTH_OPTION_IN_MS, // expand access token expire
          accessToken: await refreshAccessToken(token.refreshToken),
        }
      }

      if (trigger === 'update') {
        // Update on trigger
        const sessionData = session as Session

        return {
          ...sessionData.user,
        } as JWT
      }

      // console.log('here')
      // Return previous token if the access token has not expired yet
      return token
    },
    async session({ session, token }) {
      // console.log('Session Callback', { session, token })

      // This permission is curently not used
      // const permissionRes = await axios.get('/account/permissions', {
      //   headers: { Authorization: `Bearer ${token.accessToken}` },
      // })

      // const permissionData = permissionRes.data.data.roles

      return {
        ...session,
        user: {
          ...session.user,
          username: token.username,
          role: token.role,
          accessToken: token.accessToken,
          // permission: permissionData,
        },
      }
    },
  },
  events: {
    signOut(message) {
      console.log('signout auth')
      console.log(message.token)
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
    newUser: '/welcome',
    // error: '/auth/error',
  },
}

export const getServerAuthSession = () => getServerSession(authOption)
