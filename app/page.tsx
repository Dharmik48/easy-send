'use client'

import UploadForm from '@/components/UploadForm'
import { useState } from 'react'

export default function Home() {
	const [isDrag, setIsDrag] = useState(false)
	const [file, setFile] = useState<File | null>(null)

	const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
		const files = e.target.files
		if (!files || !files.length) return setIsDrag(false)

		const file = files[0]

		setFile(file)
		setIsDrag(false)
	}

	return (
		<main className='flex min-h-screen flex-col items-center justify-center p-24 gap-10'>
			{!!file ? (
				<UploadForm file={file} setFile={setFile} />
			) : (
				<>
					<div className="relative z-[-1] flex place-items-center before:absolute before:h-[300px] before:w-full   before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-full after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 sm:before:w-[480px] sm:after:w-[240px] before:lg:h-[360px]">
						<h1 className='relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] text-4xl lg:text-8xl   font-bold'>
							{isDrag ? 'drop here.' : 'easy send.'}
						</h1>
					</div>
					{!isDrag && <p>Drag or Click to upload</p>}
					<label
						// htmlFor='file'
						className='h-full w-full absolute z-10 cursor-pointer'
						onDragEnter={() => setIsDrag(true)}
						onDragExit={() => setIsDrag(false)}
					>
						{isDrag && (
							<div className='h-full w-full p-8'>
								<div className='border-4 border-white border-dashed rounded-lg h-full w-full'></div>
							</div>
						)}
						<input
							className='opacity-0 absolute inset-0 cursor-pointer'
							type='file'
							name='file'
							id='file'
							onChange={handleChange}
						/>
					</label>
				</>
			)}
		</main>
	)
}
