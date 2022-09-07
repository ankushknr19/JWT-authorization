import express from 'express'
import { PORT } from './config/env'
import { connectDB } from './utils/db.connect'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import { errorHandler } from './middlewares/errorHandler'
import morganLogger from './middlewares/morganLogger'
import createHttpError from 'http-errors'
import logger from './middlewares/winstonLogger'

const app = express()

app.use(express.json({ limit: '2mb' }))
app.use(helmet())
app.use(cookieParser())
app.use(morganLogger)

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/me', userRoutes)

app.get('/', (_req, res) => {
	res.send('api is running...')
})

// if route doesnot exist
app.use((_req, _res, next) => {
	next(new createHttpError.NotFound())
})

app.use(errorHandler)

const server = app.listen(PORT, () =>
	logger.info(`server is running on port http://localhost:${PORT}....`)
)

process.on('SIGTERM', () => {
	server.close(() => logger.warn('process terminated'))
})

export default app
