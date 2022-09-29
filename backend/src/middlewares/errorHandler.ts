import { NextFunction, Request, Response } from 'express'

export const errorHandler = (
	error: any,
	_req: Request,
	res: Response,
	_next: NextFunction
) => {
	// res.status(error.status || 500)
	// res.send({
	// 	error: {
	// 		status: error.status || 500,
	// 		message: error.message,
	// 	},
	// })
	const errorObject = {
		status: error.status || 500,
		message: error.message || 'Internal Server Error',
	}
	res.render('error', { errorObject })
}
