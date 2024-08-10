import { getFile } from '@/lib/actions/files.actions'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import Link from 'next/link'
import { bytesToKBs, kiloBytesToMBs, timeLeftToExpire } from '@/lib/utils'
import { Clock } from 'lucide-react'
import DownloadBtn from '@/components/DownloadBtn'
import { File } from '@/types/appwrite.types'

const Download = async ({ params }: SearchParamProps) => {
	const res = await getFile(params.id)
	const json = JSON.parse(res)

	const file: File = json.file

	if (!file) return <NoSuchFile />

	let filesizeMB = null
	const filesizeKB = bytesToKBs(parseInt(file.size))
	if (filesizeKB > 999) filesizeMB = kiloBytesToMBs(filesizeKB)

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<Card className='relative'>
				<CardHeader>
					<CardTitle className='text-lg'>Download file</CardTitle>

					<CardDescription>
						Your file is ready to download. Click on download to start.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						<div className='flex justify-between gap-4 items-center'>
							<span>{file.name}</span>
							{filesizeMB ? (
								<span className='text-muted-foreground'>{filesizeMB} MB</span>
							) : (
								<span className='text-muted-foreground'>{filesizeKB} KB</span>
							)}
						</div>
						<DownloadBtn file={file} />
					</div>
				</CardContent>
				<CardFooter>
					<div className='flex justify-between items-center gap-4 w-full'>
						<div className='text-muted-foreground text-sm flex items-center gap-1'>
							<Clock size={16} />
							<p>Expires in {timeLeftToExpire(file.$createdAt)}</p>
						</div>
						<Link href={'/'}>
							<Button variant={'link'}>New Upload</Button>
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}

const NoSuchFile = () => {
	return (
		<div className='min-h-screen flex items-center justify-center'>
			<Card className='relative'>
				<CardHeader>
					<CardTitle className='text-lg'>Requested not found!</CardTitle>
					<CardDescription>
						The link might be incorrect or the file might have expired.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<Link href={'/'} className='w-full'>
						<Button className='w-full'>New Upload</Button>
					</Link>
				</CardContent>
			</Card>
		</div>
	)
}

export default Download
