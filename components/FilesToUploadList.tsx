import { X } from 'lucide-react'
import FielIcon from './FileIcon'
import { cn } from '@/lib/utils'

interface Props {
	files: File[]
	setFiles: React.Dispatch<React.SetStateAction<File[] | null>>
	className: string
}

export function FilesToUploadList({ files, setFiles, className }: Props) {
	// TODO truncate large file names
	const removeFile = (fileToRemove: File) => {
		setFiles(prevFiles =>
			prevFiles!.filter(file => file.name !== fileToRemove.name)
		)
	}

	return (
		<ul
			className={cn(
				'border rounded-md p-2 space-y-2 transition-transform origin-top bg-background',
				className
			)}
		>
			{Array.from(files).map(file => (
				<li
					key={file.name}
					className='hover:bg-muted/50 rounded-md p-2 flex justify-between group items-center gap-2'
				>
					<div className='flex gap-2'>
						<FielIcon fileType={file.type} />
						<div className='font-medium'>{file.name}</div>
					</div>
					<X
						className='scale-0 group-hover:scale-100 transition-transform cursor-pointer text-red-500'
						onClick={() => removeFile(file)}
					/>
				</li>
			))}
		</ul>
	)
}
