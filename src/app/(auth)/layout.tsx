import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { Toaster } from '@/components/ui/toaster'

import Header from '@/components/Header'
import BackgroundEffect from '@/components/BackgroundEffect'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Sire Finance',
    description: 'Generated by create next app'
}

export default function AuthLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={inter.className}>
                <main className="flex h-auto min-h-screen flex-col">
                    <Header />
                    <div className='relative h-auto min-h-screen'>
                        <div className="absolute inset-0 -z-10 h-auto min-h-screen w-full bg-indigo-600 bg-opacity-25 bg-advertise bg-cover backdrop-opacity-10" />
                        <BackgroundEffect />
                        {children}
                    </div>
                </main>
            </body>
            <Toaster />
        </html>
    )
}
