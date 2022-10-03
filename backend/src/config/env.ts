import dotenv from 'dotenv'
import fs from 'fs'
import logger from '../middlewares/winstonLogger'

fs.existsSync('.env') ? dotenv.config() : logger.error('.env file not found.')

export const NODE_ENV = process.env.NODE_ENV as string

const prod = NODE_ENV === 'production'
export const MONGO_URI = prod
	? (process.env.MONGO_PROD as string)
	: (process.env.MONGO_LOCAL as string)

export const PORT = (process.env.PORT || 5600) as number

export const SALT_ROUND = (process.env.SALT_ROUND || 10) as number

export const ACCESS_TOKEN_SECRET_KEY = process.env
	.ACCESS_TOKEN_SECRET_KEY as string

export const REFRESH_TOKEN_SECRET_KEY = process.env
	.REFRESH_TOKEN_SECRET_KEY as string

export const ACCESS_TOKEN_TIME_TO_LIVE = process.env
	.ACCESS_TOKEN_TIME_TO_LIVE as string

export const REFRESH_TOKEN_TIME_TO_LIVE = process.env
	.REFRESH_TOKEN_TIME_TO_LIVE as string
