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

export const uploadFiles = async (data: FormData[], customLink: string) => {
	try {
		if (!customLink) throw new AppwriteException('Custom Link not given')

		const existingFile = await db.listDocuments(
			DATABASE_ID!,
			FILES_COLLECTION_ID!,
			[Query.equal('customName', customLink)]
		)

		if (existingFile.total !== 0)
			throw new AppwriteException('Custom link already in use.')

		const uploadedFiles = await Promise.all(
			data.map(async file => {
				const uploadedFile = await uploadFile(file, customLink)
				if (uploadedFile.error) throw new AppwriteException(uploadedFile.error)

				const idsAndUrls = {
					fileId: uploadedFile.fileId,
					url: `${ENDPOINT}/storage/buckets/${BUCKET_ID}/files/${uploadedFile.fileId}/view?project=${APPWRITE_PROJECT_ID}`,
				}

				return idsAndUrls
			})
		)

		const names = data.map(file => file.get('name'))
		const sizes = data.map(file => file.get('size'))
		const fileIds = uploadedFiles.map(file => file.fileId)
		const urls = uploadedFiles.map(file => file.url)

		const files = await db.createDocument(
			DATABASE_ID!,
			FILES_COLLECTION_ID!,
			ID.unique(),
			{
				fileIds,
				urls,
				customName: customLink,
				names,
				sizes,
			}
		)

		return JSON.stringify({ error: null, files })
	} catch (e: any) {
		return JSON.stringify({ error: e.message || 'Something went wrong' })
	}
}

export const uploadFile = async (data: FormData, customLink: string) => {
	let uploadedFile
	try {
		const inputFile = InputFile.fromBuffer(
			data?.get('file') as Blob,
			data?.get('name') as string
		)

		uploadedFile = await storage.createFile(BUCKET_ID!, ID.unique(), inputFile)

		return { error: null, fileId: uploadedFile.$id }
	} catch (e: any) {
		if (uploadedFile) await storage.deleteFile(BUCKET_ID!, uploadedFile.$id)

		return { error: e.message || 'Something went wrong' }
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
