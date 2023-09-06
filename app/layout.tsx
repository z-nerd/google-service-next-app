import './reset.scss'
import Providers from './providers'
import type { Metadata } from 'next'


export const metadata: Metadata = {
  title: 'Google Service',
  description: 'Google Service Demo app',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  )
}
