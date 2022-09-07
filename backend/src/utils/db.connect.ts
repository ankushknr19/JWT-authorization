import mongoose from 'mongoose'
import dotenv from 'dotenv'
dotenv.config()
const { mongoCompassURI } = process.env

export function connectDB() {
	try {
		const dbURI: string = mongoCompassURI || ''
		mongoose.connect(dbURI, () =>
			console.log('Database connected successfully!')
		)
	} catch (error) {
		console.log('error during inital connection to mongodb database')
	}
}
