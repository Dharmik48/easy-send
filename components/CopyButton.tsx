'use client'

import { cn } from '@/lib/utils'
import { Button } from './ui/button'
import { useEffect, useState } from 'react'
import { CircleCheck } from 'lucide-react'

const CopyButton = ({
	text,
	className,
}: {
	text: string
	className?: string
}) => {
	const [copied, setCopied] = useState(false)

	const copyLink = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
		navigator.clipboard.writeText(text).then(() => {
			setCopied(true)
		})
	}

	useEffect(() => {
		if (!copied) return

		const timeout = setTimeout(() => {
			setCopied(false)
		}, 3000)

		return () => clearTimeout(timeout)
	}, [copied])

	return (
		<div className='space-y-2'>
			<Button
				variant={'outline'}
				className={cn('cursor-pointer', className)}
				onClick={copyLink}
			>
				{text}
			</Button>
			<p className='text-muted-foreground text-sm text-right'>
				{copied ? (
					<div className='flex items-center justify-end gap-1'>
						<CircleCheck size={16} />
						Copied!
					</div>
				) : (
					'Click on link to copy'
				)}
			</p>
		</div>
	)
}

export default CopyButton
