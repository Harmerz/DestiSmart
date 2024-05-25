import { axios } from './axios'

export async function refreshAccessToken(refreshToken) {
  try {
    const result = await axios.post(
      '/auth/refresh-token',
      {},
      { headers: { Authorization: `Bearer ${refreshToken}` } },
    )
    const newAccessToken = result.data.accessToken
    return newAccessToken
  } catch (err) {
    return 'RefreshAccessTokenError'
  }
}

export default refreshAccessToken
