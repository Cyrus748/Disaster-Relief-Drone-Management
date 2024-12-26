import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'
import { MainNav } from '@/components/main-nav'
import Script from 'next/script'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Disaster Relief Drone Management System',
  description: 'Automated drone management for disaster relief operations',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} bg-disaster-relief min-h-screen`}>
        <div className="min-h-screen flex flex-col">
          <MainNav />
          <main className="flex-grow">{children}</main>
          <Toaster />
        </div>
        <Script
          src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`}
          strategy="lazyOnload"
        />
      </body>
    </html>
  )
}

