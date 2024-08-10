import * as sdk from 'node-appwrite'

const client = new sdk.Client()

export const {
	APPWRITE_PROJECT_ID,
	APPWRITE_API_KEY,
	APPWRITE_ENDPOINT: ENDPOINT,
	BUCKET_ID,
	DATABASE_ID,
	FILES_COLLECTION_ID,
} = process.env

client
	.setEndpoint(ENDPOINT!)
	.setProject(APPWRITE_PROJECT_ID!)
	.setKey(APPWRITE_API_KEY!)

export const storage = new sdk.Storage(client)
export const db = new sdk.Databases(client)
