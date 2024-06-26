import { Providers } from '@/components'
import './globals.css'

import PropTypes from 'prop-types'

export const metadata = {
  title: 'DestiSmart APP',
  description: 'DestiSmart Senior Project DTETI',
  manifest: '/manifest.json',
  icons: '/favicon.ico',
}
export const generateViewport = () => ({
  viewport: 'width=device-width, initial-scale=1',
  themeColor: '#222232', // Replace with your desired theme color
})
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main className="w-screen overflow-x-hidden">{children}</main>
        </Providers>
      </body>
    </html>
  )
}

RootLayout.propTypes = {
  children: PropTypes.isRequired,
}
