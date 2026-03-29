import type { Metadata } from 'next'
import './globals.css'
import { CartProvider } from '@/lib/cart'
import Navbar from '@/components/Navbar'

export const metadata: Metadata = {
  title: 'Digital Downloads Store - Premium Digital Products',
  description: 'Shop premium digital downloads including planners, templates, guides, and more.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  )
}
