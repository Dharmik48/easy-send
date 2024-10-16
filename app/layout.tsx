import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import { Toaster } from '@/components/ui/sonner'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
	title: 'Easy Send',
	description:
		'Upload files to share with others without any hassle of logging in and also NO ADS!',
}

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode
}>) {
	return (
		<html lang='en' className='dark'>
			<body
				className={cn(
					'min-h-screen bg-background font-sans antialiased',
					inter.className
				)}
			>
				{children}
				<Toaster />
			</body>
		</html>
	)
}
