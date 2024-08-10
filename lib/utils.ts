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
