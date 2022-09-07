import { Response } from 'express'
import createError from 'http-errors'
import { get } from 'lodash'
import { UserModel } from '../../models/user.model'
import { signAccessTokenAsync, signRefreshTokenAsync } from './sign.jwt.utils'
import { verifyRefreshToken } from './verify.jwt.utils'

export const reissueTokens = (res: Response, refreshToken: string) => {
	return new Promise<{
		newAccessToken: string | undefined
		newRefreshToken: string | undefined
	}>(async (resolve, reject) => {
		const { decoded, expired } = await verifyRefreshToken(refreshToken)
		//if refresh token verification fails
		if (!decoded || !get(decoded, 'userId') || expired) {
			return reject(new createError.Unauthorized())
		}

		//find user
		const user = await UserModel.findById(get(decoded, 'userId'))

		if (!user) {
			return reject(new createError.Unauthorized())
		}

		//sign new tokens
		const newAccessToken = await signAccessTokenAsync(res, {
			userId: user._id,
		})
		const { refreshToken: newRefreshToken, refreshTokenId } =
			await signRefreshTokenAsync(res, user._id)

		//update refresh token id in database
		user.refreshTokenId = refreshTokenId
		await user.save()

		resolve({ newAccessToken, newRefreshToken }),
			(err: any) => {
				if (err) {
					return reject(new createError.InternalServerError())
				}
			}
	})
}
