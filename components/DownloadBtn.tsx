'use client'

import { File } from '@/types/appwrite.types'
import { Button } from './ui/button'
import { toast } from 'sonner'
import Loader from './Loader'
import { useState } from 'react'
import { cn } from '@/lib/utils'

interface Props {
	file: { urls: string[]; names: string[] }
	children: React.ReactNode
	className?: string
}

const DownloadBtn = ({ file, children, className }: Props) => {
	const [loading, setLoading] = useState(false)

	const handleDownload = async () => {
		setLoading(true)

		try {
			toast.success('Download Started')
			file.urls.forEach(async (url, i) => {
				const response = await fetch(url)
				if (!response.ok) throw new Error('Network response was not ok')

				const blob = await response.blob()
				const bloburl = window.URL.createObjectURL(blob)
				const link = document.createElement('a')
				link.href = bloburl
				link.download = file.names[i]
				document.body.appendChild(link)
				link.click()
				document.body.removeChild(link)
				window.URL.revokeObjectURL(url)
			})
		} catch (error) {
			toast.error('Error downloading the file')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Button
			className={cn('w-full', className)}
			onClick={handleDownload}
			disabled={loading}
		>
			{loading ? <Loader /> : children}
		</Button>
	)
}

export default DownloadBtn
