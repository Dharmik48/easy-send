'use client'

import { Button } from '@/components/ui/button'
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { uploadFile } from '@/lib/actions/files.actions'
import { parseToLink } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import Loader from './Loader'

interface Props {
	file: File
	setFile: (val: File | null) => void
}

const UploadForm = ({ file, setFile }: Props) => {
	const router = useRouter()
	const [open, setOpen] = useState(true)
	const [linkValue, setLinkValue] = useState('')
	const [loading, setLoading] = useState(false)

	const handleUpload = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		if (!linkValue.length) return toast.error('Please enter custom link')

		try {
			const blob = new Blob([file], {
				type: file.type,
			})

			const data = new FormData()
			data.append('file', blob)
			data.append('name', file.name)
			data.append('size', `${file.size}`)
			data.append('custom-link', parseToLink(linkValue))

			const res = await uploadFile(data)
			const json = JSON.parse(res)

			if (json.error) throw new Error(json.error)

			toast.success('Upload success')
			router.push(
				`/success?customName=${linkValue}&filename=${file.name}&filesize=${file.size}`
			)
		} catch (e: any) {
			toast.error(e.message)
		} finally {
			setLoading(false)
		}
	}

	return (
		<Dialog
			open={open}
			defaultOpen={true}
			onOpenChange={open => {
				if (open) return setOpen(true)
				setFile(null)
				setOpen(false)
			}}
		>
			{/* <DialogTrigger asChild>
				<Button variant='outline'>Edit Profile</Button>
			</DialogTrigger> */}
			<DialogContent className='sm:min-w-[428px]'>
				<DialogHeader>
					<DialogTitle>Upload {file.name}</DialogTitle>
					<DialogDescription>
						Once uploaded the file will be available for 7 days{' '}
						{!!linkValue &&
							`on ${process.env.NEXT_PUBLIC_URL}/${parseToLink(linkValue)}`}
					</DialogDescription>
				</DialogHeader>
				<form className='grid gap-4 py-4' onSubmit={handleUpload}>
					<div className='flex flex-col gap-4'>
						<Label htmlFor='link'>Custom Link</Label>
						<Input
							// required
							id='link'
							className=''
							value={linkValue}
							onChange={e => setLinkValue(e.target.value)}
							maxLength={15}
						/>
					</div>
					{/* <DialogFooter> */}
					<Button
						type='submit'
						className='disabled:cursor-not-allowed'
						disabled={loading}
					>
						{loading ? <Loader /> : 'Upload'}
					</Button>
				</form>
				{/* </DialogFooter> */}
			</DialogContent>
		</Dialog>
	)
}

export default UploadForm
