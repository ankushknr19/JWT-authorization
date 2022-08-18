import mongoose from 'mongoose'
import { MONGO_COMPASS_URI } from '../config/env'

export async function connectDB() {
	try {
		const dbURI: string = MONGO_COMPASS_URI || ''

		await mongoose.connect(dbURI)
	} catch (error) {
		console.log('error during inital connection to mongodb database')
		process.exit(1)
	}
	mongoose.set('debug', true)
}

mongoose.connection.on('connected', () => console.log('Mongoose connected...'))

mongoose.connection.on('error', (err) => console.log(err.message))

mongoose.connection.on('disconnected', () =>
	console.log('Mongoose disconnected.')
)

//ctrl+C gives SIGINT signal
process.on('SIGINT', async () => {
	await mongoose.connection.close()
})
