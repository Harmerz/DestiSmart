// Access token expire. Example: 60 means access_token expire after a minute (60 second)
export const ACCESS_TOKEN_EXP = 60 * 30 // in sekon
export const ACCESS_TOKEN_EXP_IN_MS = ACCESS_TOKEN_EXP * 1000 // in ms

/**
 * ACCESS_TOKEN_EXP_AUTH_OPTION < ACCESS_TOKEN_EXP_AUTH_REVALIDATE
 * This is for handle user that have slow internet speed
 */
export const ACCESS_TOKEN_EXP_AUTH_OPTION_IN_MS = ACCESS_TOKEN_EXP_IN_MS - 10000
export const ACCESS_TOKEN_EXP_AUTH_REVALIDATE = ACCESS_TOKEN_EXP - 3

/**
 * Must be the same as from the public middleware
 * This is exist because we cannot directly import from public middleware (error happen)
 */
export const PUBLIC_PAGES_OBJ = {
  signIn: '/signin',
  signUp: '/signup',
  needVerify: '/need-verify',
  unverified: '/unverified',
  verified: '/verified',
  verifyEmail: '/verify-email',
  resendActivation: '/resend-activation',

  // forget password
  forgetPassword: '/forget-password',
  forgetPasswordEmailSent: '/forget-password-email-sent',
  resetPassword: '/reset-password',
}
export const PUBLIC_PAGES = Object.values(PUBLIC_PAGES_OBJ).map((v) => v)
