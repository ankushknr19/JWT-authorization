import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import { UserModel } from '../../models/user.model'

export const userLogoutController = async (
	_req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const userId = res.locals.user.userId
		if (!userId) throw new createError.Unauthorized()

		const user = await UserModel.findById(userId)

		if (!user) throw new createError.Unauthorized()

		await UserModel.updateOne(
			{ _id: userId },
			{ $unset: { refreshTokenId: '' } }
		)

		res.clearCookie('accessToken', { path: '/', httpOnly: true })

		res.clearCookie('refreshToken', { path: '/', httpOnly: true })

		res.status(200).send('logged out successfully')
	} catch (error: any) {
		next(error)
	}
}
