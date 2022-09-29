import { Request, Response } from 'express'
import { UserModel } from '../../models/user.model'
import {
	signAccessTokenAsync,
	signRefreshTokenAsync,
} from '../../utils/jwt_utils/sign.jwt.utils'
import { userLoginSchema } from '../../schemas/auth_schemas/login.schema'
import createHttpError from 'http-errors'

export const userLoginController = async (req: Request, res: Response) => {
	try {
		//validate data
		const result = await userLoginSchema.validateAsync(req.body)

		//get data from request after validating
		const { email, password } = result

		//find user using email
		const user = await UserModel.findOne({ email })

		if (!user) {
			throw new createHttpError.BadRequest('User not registered')
		}
		// check if raw password matches the ecrypted password
		const isMatch = await user.comparePassword(password)
		if (!isMatch) {
			throw new createHttpError.Unauthorized('Invalid email/password')
		}

		//sign access token
		await signAccessTokenAsync(res, { userId: user._id })

		//sign refresh token
		const { refreshTokenId } = await signRefreshTokenAsync(res, user._id)

		//store refresh token id in database
		user.refreshTokenId = refreshTokenId
		await user.save()

		// res.status(200).send({
		// 	message: 'Sucessfully logged in',
		// 	user: user._id,
		// 	username: user.username,
		// 	role: user.role,
		// })
		res.redirect('/views/profile')
	} catch (error: any) {
		//do not send exact error message from validation
		// if (error.isJoi) {
		// 	return next(new createHttpError.BadRequest('Invalid email/password'))
		// }
		// next(error)
		if (error.isJoi) {
			error.status = 400
			error.message = 'Invalid email/password'
		}
		res.render('login', { messageObject: error })
	}
}
