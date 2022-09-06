import morgan, { StreamOptions } from 'morgan'
import { NODE_ENV } from '../config/env'

import logger from './winstonLogger'

// Override the stream method by telling
// Morgan to use our custom logger instead of the console.log.
const stream: StreamOptions = {
	// Use the http severity
	write: (message) => logger.http(message),
}

// Skip all the Morgan http log if the
// application is not running in development mode.
const skip = () => {
	const env = NODE_ENV || 'development'
	return env !== 'development'
}

const morganLogger = morgan(
	':method :url :status :res[content-length] - :response-time ms',
	{ stream, skip }
)

export default morganLogger
