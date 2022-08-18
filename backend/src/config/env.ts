import dotenv from 'dotenv'

dotenv.config()

export const PORT = process.env.PORT || 5000
export const MONGO_COMPASS_URI = process.env.mongoCompassURI
export const SALT_ROUND = process.env.SALT_ROUND
export const ACCESS_TOKEN_SECRET_KEY = process.env.accessTokenSecretKey
export const REFRESH_TOKEN_SECRET_KEY = process.env.refreshTokenSecretKey
export const ACCESS_TOKEN_TIME_TO_LIVE = process.env.accessTokenTimeToLive
export const REFRESH_TOKEN_TIME_TO_LIVE = process.env.refreshTokenTimeToLive
