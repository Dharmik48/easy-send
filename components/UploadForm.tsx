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
import { uploadFile, uploadFiles } from '@/lib/actions/files.actions'
import { parseToLink } from '@/lib/utils'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { toast } from 'sonner'
import Loader from './Loader'
import { FilesToUploadList } from './FilesToUploadList'
import { Eye, EyeOffIcon } from 'lucide-react'

interface Props {
	files: File[]
	setFiles: React.Dispatch<React.SetStateAction<File[] | null>>
}

const UploadForm = ({ files, setFiles }: Props) => {
	const router = useRouter()
	const [open, setOpen] = useState(true)
	const [linkValue, setLinkValue] = useState('')
	const [loading, setLoading] = useState(false)
	const [showFiles, setShowFiles] = useState(false)

	const handleUpload = async (e: React.FormEvent) => {
		e.preventDefault()
		setLoading(true)
		if (!linkValue.length) return toast.error('Please enter custom link')

		try {
			const data = files.map(file => {
				const fileData = new FormData()
				fileData.append('file', new Blob([file], { type: file.type }))
				fileData.append('name', file.name)
				fileData.append('size', `${file.size}`)
				fileData.append('custom-link', parseToLink(linkValue))

				return fileData
			})

			const res = await uploadFiles(data, parseToLink(linkValue))
			const json = JSON.parse(res)

			if (json.error) throw new Error(json.error)

			const totalSize = files.reduce((acc, file) => acc + file.size, 0)

			toast.success('Upload success')
			router.push(
				`/success?customName=${linkValue}&filename=${'yo'}&filesize=${totalSize}&filesCount=${
					files.length
				}`
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
				setFiles(null)
				setOpen(false)
			}}
		>
			<DialogContent className='sm:min-w-[428px] gap-0'>
				<DialogHeader>
					<DialogTitle>Upload following {files.length} files?</DialogTitle>
					<DialogDescription>
						Once uploaded the files will be available for 7 days{' '}
						{!!linkValue &&
							`on ${process.env.NEXT_PUBLIC_URL}/${parseToLink(linkValue)}`}
					</DialogDescription>
				</DialogHeader>
				<Button
					className='my-4 lg:mr-auto lg:px-0 space-x-2'
					variant={'link'}
					onClick={() => setShowFiles(prev => !prev)}
				>
					{showFiles ? (
						<>
							<EyeOffIcon size={20} /> <span>Hide</span>
						</>
					) : (
						<>
							<Eye size={20} /> <span>Show</span>
						</>
					)}
				</Button>
				<div className='h-0'>
					<FilesToUploadList
						className={showFiles ? 'scale-100' : 'scale-0'}
						files={files}
						setFiles={setFiles}
					/>
				</div>
				<form className='grid gap-4' onSubmit={handleUpload}>
					<div className='flex flex-col gap-4'>
						<Label htmlFor='link'>Custom Link</Label>
						<Input
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
