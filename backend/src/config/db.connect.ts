import mongoose from 'mongoose'
import { MONGO_URI } from './env'
import logger from '../middlewares/winstonLogger'

export async function connectDB() {
	try {
		const dbURI: string = MONGO_URI || ''

		await mongoose.connect(dbURI)
	} catch (error) {
		logger.error('error during inital connection to mongodb database')
		process.exit()
	}
}

mongoose.connection.on('connected', () => logger.info('Mongoose connected...'))

mongoose.connection.on('error', (err) => logger.error(err.message))

mongoose.connection.on('disconnected', () =>
	logger.warn('Mongoose disconnected.')
)

//ctrl+C gives SIGINT signal
process.on('SIGINT', async () => {
	await mongoose.connection.close()
})
