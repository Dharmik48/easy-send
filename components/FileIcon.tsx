import { File, FileText, ImageIcon } from 'lucide-react'
import { PiFileCss, PiFileHtml, PiFilePdf } from 'react-icons/pi'
import { PiFileDoc } from 'react-icons/pi'
import { PiFilePpt } from 'react-icons/pi'

interface Props {
	fileType: string
}

const FielIcon = ({ fileType }: Props) => {
	if (fileType.includes('image')) return <ImageIcon size={24} />
	if (fileType.includes('pdf')) return <PiFilePdf size={24} />
	if (fileType.includes('presentation')) return <PiFilePpt size={24} />
	if (fileType.includes('word')) return <PiFileDoc size={24} />
	if (fileType.includes('html')) return <PiFileHtml size={24} />
	if (fileType.includes('css')) return <PiFileCss size={24} />

	return <File size={24} />
}

export default FielIcon
