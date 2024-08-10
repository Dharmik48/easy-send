import { Models } from 'node-appwrite'

export interface File extends Models.Document {
	name: string
	url: string
	size: string
	customName: string
}
