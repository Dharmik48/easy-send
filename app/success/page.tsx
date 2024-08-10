import CopyButton from '@/components/CopyButton'
import { Button } from '@/components/ui/button'
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card'
import { bytesToKBs, kiloBytesToMBs } from '@/lib/utils'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const Success = ({ searchParams }: SearchParamProps) => {
	const { customName, filename, filesize: filesizeInBytes } = searchParams

	if (!customName) redirect('/')

	const downloadLink = `${process.env.NEXT_PUBLIC_URL}/${customName}`

	let filesizeMB = null
	const filesizeKB = bytesToKBs(parseInt(filesizeInBytes as string))
	if (filesizeKB > 999) filesizeMB = kiloBytesToMBs(filesizeKB)

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<Card className='relative'>
				<CardHeader>
					<CardTitle className='text-lg'>Upload Successful!</CardTitle>
					<CardDescription>
						Your upload will be available for 7 days on mentioned the link.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						{!!filesizeKB && (
							<div className='flex justify-between'>
								<span>{filename}</span>
								{filesizeMB ? (
									<span className='text-muted-foreground'>{filesizeMB} MB</span>
								) : (
									<span className='text-muted-foreground'>{filesizeKB} KB</span>
								)}
							</div>
						)}
						<CopyButton text={downloadLink} className='w-full justify-start' />
					</div>
				</CardContent>
				<CardFooter>
					<div className='flex items-center gap-2 w-full'>
						<Link href={'/'} className='w-full'>
							<Button className='w-full'>New Upload</Button>
						</Link>
						<Link href={downloadLink} className='w-full'>
							<Button className='w-full'>Download</Button>
						</Link>
					</div>
				</CardFooter>
			</Card>
		</div>
	)
}

export default Success
