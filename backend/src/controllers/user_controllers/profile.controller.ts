import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { UserModel } from '../../models/user.model'

//@desc get one user
//@route GET /api/users/:id
//@access private

export const getProfileController = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const id = res.locals.user?.userId

		const user = await UserModel.findById(id).select('-password')
		if (!user) throw new createHttpError.NotFound()

		res.render('profile', { user })
	} catch (error: any) {
		next(error)
	}
}
