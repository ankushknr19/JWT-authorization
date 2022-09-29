//used in routes where user is required

import { Request, Response, NextFunction } from 'express'
import createHttpError from 'http-errors'
import { UserModel } from '../models/user.model'

export const requireUser = (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = res.locals.user
		//in deserialzeUser, we put the user in the response object because they had a valid token

		if (!user) throw new createHttpError.Unauthorized()

		return next()
	} catch (error: any) {
		next(error)
	}
}

//throw error if user is logged in and tries to visit register page
export const checkLoggedInUser = (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = res.locals.user

		if (user) throw new createHttpError.Unauthorized()

		return next()
	} catch (error: any) {
		next(error)
	}
}

//require admin role
export const requireAdmin = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = res.locals.user
		console.log(user)

		if (!user) throw new createHttpError.Unauthorized()

		const DBuser = await UserModel.findById(user?.userId).select('-password')
		if (DBuser?.role !== 'admin') throw new createHttpError.Unauthorized()

		return next()
	} catch (error: any) {
		next(error)
	}
}
