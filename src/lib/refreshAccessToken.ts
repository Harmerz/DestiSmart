import { axios } from './axios'

export async function refreshAccessToken(refreshToken: string) {
  try {
    const result = await axios.post(
      '/user/refresh-token',
      {},
      { headers: { Authorization: `Bearer ${refreshToken}` } },
    )
    const newAccessToken: string = result.data.accessToken
    return newAccessToken
  } catch {
    return 'RefreshAccessTokenError'
  }
}

export default refreshAccessToken
