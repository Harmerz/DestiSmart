import './globals.css'

import PropTypes from 'prop-types'

export const metadata = {
  title: 'DestiSmart APP',
  description: 'DestiSmart Senior Project DTETI',
  manifest: '/manifest.json',
  viewport: 'width=device-width, initial-scale=1',
  icons: ['/favicon.ico'],
  themeColor: '#ffffff',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <main>{children}</main>
      </body>
    </html>
  )
}

RootLayout.propTypes = {
  children: PropTypes.isRequired,
}
