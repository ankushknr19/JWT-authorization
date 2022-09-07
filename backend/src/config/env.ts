import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT
export const NODE_ENV = process.env.NODE_ENV
export const MONGO_COMPASS_URI = process.env.MONGO_COMPASS_URI
export const SALT_ROUND = process.env.SALT_ROUND
export const ACCESS_TOKEN_SECRET_KEY = process.env.ACCESS_TOKEN_SECRET_KEY
export const REFRESH_TOKEN_SECRET_KEY = process.env.REFRESH_TOKEN_SECRET_KEY
export const ACCESS_TOKEN_TIME_TO_LIVE = process.env.ACCESS_TOKEN_TIME_TO_LIVE
export const REFRESH_TOKEN_TIME_TO_LIVE = process.env.REFRESH_TOKEN_TIME_TO_LIVE
