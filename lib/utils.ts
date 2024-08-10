import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}

export function parseToLink(link: string): string {
	const separated = link.split(' ')
	const parsed = separated.join('-')

	return parsed
}

export function bytesToKBs(bytes: number) {
	return Math.round((bytes / 1024 + Number.EPSILON) * 100) / 100
}

export function kiloBytesToMBs(kbs: number) {
	return Math.round((kbs / 1024 + Number.EPSILON) * 100) / 100
}
