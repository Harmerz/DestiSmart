import './globals.css'

import React from 'react'

import { Providers } from '@/components/Providers'

export const metadata = {
  title: 'Re SFX Music Tools',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <main>{children}</main>
        </Providers>
      </body>
    </html>
  )
}
