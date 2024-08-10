'use client'

import { File } from '@/types/appwrite.types'
import { Button } from './ui/button'
import { toast } from 'sonner'
import Loader from './Loader'
import { useState } from 'react'

const DownloadBtn = ({ file }: { file: File }) => {
	const [loading, setLoading] = useState(false)

	const handleDownload = async () => {
		setLoading(true)
		const fileUrl = file.url
		try {
			const response = await fetch(fileUrl)
			if (!response.ok) throw new Error('Network response was not ok')

			const blob = await response.blob()
			const url = window.URL.createObjectURL(blob)
			const link = document.createElement('a')
			link.href = url
			link.download = file.name
			document.body.appendChild(link)
			link.click()
			toast.success('Download Started')
			document.body.removeChild(link)
			window.URL.revokeObjectURL(url)
		} catch (error) {
			toast.error('Error downloading the file')
		} finally {
			setLoading(false)
		}
	}

	return (
		<Button className='w-full' onClick={handleDownload} disabled={loading}>
			{loading ? <Loader /> : 'Download'}
		</Button>
	)
}

export default DownloadBtn
