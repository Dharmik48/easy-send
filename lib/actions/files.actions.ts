'use server'

import { InputFile } from 'node-appwrite/file'
import {
	APPWRITE_PROJECT_ID,
	BUCKET_ID,
	DATABASE_ID,
	db,
	ENDPOINT,
	FILES_COLLECTION_ID,
	storage,
} from '../appwrite.config'
import { AppwriteException, ID, Query } from 'node-appwrite'

export const uploadFile = async (data: FormData) => {
	let uploadedFile
	try {
		const customLink = data.get('custom-link')?.toString()
		if (!customLink) throw new AppwriteException('Custom Link not given')

		const inputFile = InputFile.fromBuffer(
			data?.get('file') as Blob,
			data?.get('name') as string
		)

		const existingFile = await db.listDocuments(
			DATABASE_ID!,
			FILES_COLLECTION_ID!,
			[Query.equal('customName', customLink)]
		)

		if (existingFile.total !== 0)
			throw new AppwriteException('Custom link already in use.')

		uploadedFile = await storage.createFile(BUCKET_ID!, customLink, inputFile)

		const file = await db.createDocument(
			DATABASE_ID!,
			FILES_COLLECTION_ID!,
			ID.unique(),
			{
				url: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploadedFile.$id}/view?project=${APPWRITE_PROJECT_ID}`,
				customName: customLink,
				name: data.get('name'),
				size: data.get('size'),
				fileId: uploadedFile.$id,
			}
		)

		return JSON.stringify({ error: null, file })
	} catch (e: any) {
		if (uploadedFile) await storage.deleteFile(BUCKET_ID!, uploadedFile.$id)

		return JSON.stringify({ error: e.message || 'Something went wrong' })
	}
}

export const getFile = async (id: string) => {
	try {
		const filesData = await db.listDocuments(
			DATABASE_ID!,
			FILES_COLLECTION_ID!,
			[Query.equal('customName', id)]
		)

		if (filesData.total === 0)
			return JSON.stringify({ error: null, file: null })

		const file = filesData.documents[0]

		return JSON.stringify({ error: null, file })
	} catch (e: any) {
		return JSON.stringify({ error: e.message || 'Something went wrong' })
	}
}
