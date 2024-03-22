import { Poppins, Red_Rose, Urbanist, Work_Sans } from 'next/font/google'

import ModalProvider from '@/providers/modal-provider'
import ToastProvider from '@/providers/toast-provider'
import Navbar from '@/components/navbar'
import Footer from '@/components/footer'
import './globals.css'
import { AuthProvider } from './_providers/Auth'

const poppins = Work_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100','200','300', '400', '500', '600', '700']
});
export const metadata = {
  title: 'Store',
  description: 'Store - The place for all your purchases.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${poppins.variable}`}>
        <AuthProvider>
        <ToastProvider />
        <ModalProvider />
        <Navbar />
        <div className='bg-white'>
          {children}
        </div>
        <Footer />
        </AuthProvider>
      </body>
    </html>
  )
}
