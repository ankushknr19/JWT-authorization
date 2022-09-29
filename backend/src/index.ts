import express from 'express'
import { PORT } from './config/env'
import { connectDB } from './utils/db.connect'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes'
import viewRoutes from './routes/view.routes'
import { errorHandler } from './middlewares/errorHandler'
import morganLogger from './middlewares/morganLogger'
import createHttpError from 'http-errors'
import logger from './middlewares/winstonLogger'
import { deserialzeUser } from './middlewares/deserializeUser'

const app = express()

app.use(helmet())
app.use(express.json({ limit: '2mb' }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(deserialzeUser)
app.use(morganLogger)

connectDB()

app.set('view engine', 'ejs')

app.use('/api/auth', authRoutes)
app.use('/views', viewRoutes)

app.get('/', (_req, res) => {
	res.redirect('/views/home')
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
