import { Response } from 'express'
import { get } from 'lodash'
import { userModel } from '../../models/user.model'
import { signJwtAccessToken, signJwtRefreshToken } from './sign.jwt.utils'
import { verifyRefreshToken } from './verify.jwt.utils'

//reissue tokens
export const reissueTokens = async (res: Response, refreshToken: string) => {
	try {
		const { decoded, expired } = await verifyRefreshToken(refreshToken)

		if (!decoded || !get(decoded, 'userId') || expired) {
			throw new Error()
		}

		//find user
		const user = await userModel.findById(get(decoded, 'userId'))

		if (!user) {
			throw new Error()
		}

		//sign new tokens
		const newAccessToken = signJwtAccessToken(res, { userId: user._id })
		const { refreshToken: newRefreshToken, refreshTokenId } =
			signJwtRefreshToken(res, user._id)

		//update refresh token id in database
		user.refreshTokenId = refreshTokenId
		await user.save()

		return { newAccessToken, newRefreshToken }
	} catch (error: any) {
		return error
	}
}
