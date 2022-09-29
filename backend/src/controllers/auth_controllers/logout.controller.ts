import { NextFunction, Request, Response } from 'express'
import createHttpError from 'http-errors'
import { UserModel } from '../../models/user.model'

// @desc logout user
// @route DELETE /api/auth/logout
// @access private

export const userLogoutController = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = res.locals.user.userId
		if (!userId) throw new createHttpError.Unauthorized()
		const user = await UserModel.findById(userId).select('-password')

		if (!user) throw new createHttpError.Unauthorized()
		await UserModel.updateOne(
			{ _id: userId },
			{ $unset: { refreshTokenId: '' } }
		)

		res.clearCookie('accessToken', { path: '/', httpOnly: true })

		res.clearCookie('refreshToken', { path: '/', httpOnly: true })

		res.redirect('/')
	} catch (error: any) {
		next(error)
	}
}
