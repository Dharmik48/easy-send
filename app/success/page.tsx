import Confetti from '@/components/Confetti'
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
import { bytesToKBs, kiloBytesToMBs, parseToLink } from '@/lib/utils'
import Link from 'next/link'
import { redirect } from 'next/navigation'

const Success = ({ searchParams }: SearchParamProps) => {
	const {
		customName,
		filename,
		filesize: filesizeInBytes,
		filesCount,
	} = searchParams

	if (!customName) redirect('/')

	const downloadLink = `${process.env.NEXT_PUBLIC_URL}/${parseToLink(
		customName as string
	)}`

	let filesizeMB = null
	const filesizeKB = bytesToKBs(parseInt(filesizeInBytes as string))
	if (filesizeKB > 999) filesizeMB = kiloBytesToMBs(filesizeKB)

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<Confetti />
			<Card className='relative'>
				<div className="-z-10 before:absolute before:h-[300px] before:w-full before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px] pointer-events-none"></div>
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
								<span>{filename ? filename : `${filesCount} file(s)`}</span>
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
