import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { userModel } from '../../models/user.model'
import bcrypt from 'bcrypt'
import {
	signJwtAccessToken,
	signJwtRefreshToken,
} from '../../utils/jwt_utils/sign.jwt.utils'

dotenv.config()

export const userLoginController = async (req: Request, res: Response) => {
	try {
		//get data from request after validating
		const { email, password } = req.body

		//find user using email
		const user = await userModel.findOne({ email })
		if (!user) {
			throw new Error('invalid email')
		}
		// check if password matches
		const isValidPassword = await bcrypt.compare(password, user.password)
		if (!isValidPassword) {
			throw new Error('invalid password')
		}

		//sign access token
		signJwtAccessToken(res, { userId: user._id })

		//sign refresh token
		const { refreshTokenId } = signJwtRefreshToken(res, user._id)

		//store refresh token id in database
		user.refreshTokenId = refreshTokenId
		await user.save()

		res.status(200).send({
			message: 'Sucessfully logged in',
			user: user._id,
		})
	} catch (error: any) {
		res.status(404).send(error.message)
	}
}