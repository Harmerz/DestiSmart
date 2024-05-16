import { DefaultSession, DefaultUser } from 'next-auth'

export type NextauthRole = 'admin' | 'user'

interface IUser extends DefaultUser {
  name: string
  email: string
  role: string
  // Username
  username: string
  // Role of user
  role: NextauthRole
  // Access token
  accessToken: string
  refreshToken: string

  // Time to regenerate the accessToken
  accessTokenExpires: number
  refreshTokenExpires: number
}
declare module 'next-auth' {
  interface User extends IUser {}
  interface Session extends DefaultSession {
    user?: User
  }
}
declare module 'next-auth/jwt' {
  interface JWT extends IUser {}
}
