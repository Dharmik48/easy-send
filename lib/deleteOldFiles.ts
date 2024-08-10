'use server'

import {
	BUCKET_ID,
	DATABASE_ID,
	db,
	FILES_COLLECTION_ID,
	storage,
} from './appwrite.config'

async function deleteOldFiles() {
	const now = new Date()
	const sevenDaysAgo = new Date(now.setDate(now.getDate() - 7)).toISOString()

	try {
		const documents = await db.listDocuments(DATABASE_ID!, FILES_COLLECTION_ID!)

		for (const doc of documents.documents) {
			if (doc.uploadDate < sevenDaysAgo) {
				await storage.deleteFile(BUCKET_ID!, doc.fileId)
				await db.deleteDocument(DATABASE_ID!, FILES_COLLECTION_ID!, doc.$id)
				console.log(`Deleted file: ${doc.fileId}`)
			}
		}
	} catch (error) {
		console.error('Error deleting old files:', error)
	}
}

deleteOldFiles()
