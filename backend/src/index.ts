import express from 'express'
import { PORT } from './config/env'
import { connectDB } from './utils/db.connect'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import createError from 'http-errors'
import morgan from 'morgan'
import { limiter } from './middlewares/rateLimit'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import { errorHandler } from './middlewares/errorHandler'

const app = express()

app.use(morgan('dev'))
app.use(express.json())
app.use(helmet())
app.use(cookieParser())
app.use(limiter)

connectDB()

app.use('/api/auth', authRoutes)
app.use('/api/me', userRoutes)

app.get('/', (_req, res) => {
	res.send('api is running...')
})

// if route doesnot exist
app.use((_req, _res, next) => {
	next(new createError.NotFound())
})

app.use(errorHandler)

try {
	app.listen(PORT, () =>
		console.log(`server is running on port http://localhost:${PORT}....`)
	)
} catch (error: any) {
	console.log('error during server connection')
	process.exit()
}

export default app
