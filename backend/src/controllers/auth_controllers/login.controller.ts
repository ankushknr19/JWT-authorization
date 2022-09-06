import createError from 'http-errors'
import { NextFunction, Request, Response } from 'express'
import { UserModel } from '../../models/user.model'
import {
	signAccessTokenAsync,
	signRefreshTokenAsync,
} from '../../utils/jwt_utils/sign.jwt.utils'
import { userLoginSchema } from '../../schemas/auth_schemas/login.schema'

export const userLoginController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//validate incoming data
		const result = await userLoginSchema.validateAsync(req.body)
		//get data from request after validating
		const { email, password } = result

		//find user using email
		const user = await UserModel.findOne({ email })
		if (!user) {
			throw new createError.BadRequest('User not registered')
		}
		// check if raw password matches the ecrypted password
		const isMatch = await user.comparePassword(password)
		if (!isMatch) {
			throw new createError.Unauthorized('Invalid email/password')
		}

		//sign access token
		await signAccessTokenAsync(res, {
			userId: user._id,
		})

		//sign refresh token
		const { refreshTokenId } = await signRefreshTokenAsync(res, user._id)

		//store refresh token id in database
		user.refreshTokenId = refreshTokenId
		await user.save()

		res.status(200).send({
			message: 'Sucessfully logged in',
			user: user._id,
			role: user.role,
		})
	} catch (error: any) {
		//do not send exact error message from validation
		if (error.isJoi) {
			return next(new createError.BadRequest('Invalid email/password'))
		}
		next(error)
	}
}
