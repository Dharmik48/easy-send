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
import {
	bytesToKBs,
	kiloBytesToMBs,
	parseFileSize,
	timeLeftToExpire,
} from '@/lib/utils'
import { Clock } from 'lucide-react'
import DownloadBtn from '@/components/DownloadBtn'
import { File } from '@/types/appwrite.types'

const Download = async ({ params }: SearchParamProps) => {
	const res = await getFile(params.id)
	const json = JSON.parse(res)
	console.log(json)

	const data = json.file
	const file: File = json.file

	if (!data || !data.urls.length) return <NoSuchFile />

	const totalSize = data.sizes.reduce(
		(acc: number, size: string) => acc + parseInt(size),
		0
	)

	return (
		<div className='min-h-screen flex items-center justify-center'>
			<Card className='relative'>
				<CardHeader>
					<CardTitle className='text-lg'>
						Download {data.urls.length} file(s)
					</CardTitle>

					<CardDescription>
						Your {data.urls.length === 1 ? 'file is ' : 'files are '} ready to
						download. Click on download to start.
					</CardDescription>
				</CardHeader>
				<CardContent>
					<div className='space-y-4'>
						<ul className='flex flex-col gap-2'>
							{data.urls.map((url: string, i: number) => (
								<li
									key={url}
									className='w-full relative group overflow-hidden rounded-md'
								>
									<Button
										variant={'outline'}
										className='flex justify-between w-full'
									>
										<span>{data.names[i]}</span>
										<span>{parseFileSize(data.sizes[i])}</span>
									</Button>
									<DownloadBtn
										className='absolute inset-0 bg-primary text-primary-foreground cursor-pointer translate-y-full group-hover:translate-y-0 transition-transform backdrop-blur-sm flex justify-between'
										file={{ urls: [url], names: [data.names[i]] }}
									>
										<span>Download {data.names[i]}</span>
										<span>{parseFileSize(data.sizes[i])}</span>
									</DownloadBtn>
								</li>
							))}
						</ul>
						<div className='flex justify-between gap-4 items-center'>
							<span>{file.name}</span>
							<span className='text-muted-foreground'>
								{parseFileSize(totalSize)}
							</span>
						</div>
						<DownloadBtn file={{ urls: data.urls, names: data.names }}>
							Download All
						</DownloadBtn>
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
