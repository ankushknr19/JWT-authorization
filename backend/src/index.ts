import dotenv from 'dotenv'
import express from 'express'
import helmet from 'helmet'
import cookieParser from 'cookie-parser'
import { connectDB } from './utils/db.connect'
import authRoutes from './routes/auth.routes'
import userRoutes from './routes/user.routes'
import { limiter } from './middlewares/rateLimit'

dotenv.config()
const app = express()

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

const PORT = process.env.PORT

app.listen(PORT, () =>
	console.log(`server is running on port http://localhost:${PORT}....`)
)
