import express from 'express'
import { PORT } from './config/env'
import { connectDB } from './utils/db.connect'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import authRoutes from './routes/auth.routes'
import { errorHandler } from './middlewares/errorHandler'

const app = express()

app.use(express.json({ limit: '2mb' }))
app.use(helmet())
app.use(cookieParser())

connectDB()

app.use('/api/auth', authRoutes)

app.get('/', (_req, res) => {
	res.send('api is running...')
})

// if route doesnot exist
app.use((_req, _res, next) => {
	next(new Error('not found'))
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
