import { get } from 'lodash' //makes little bit safe to access property that we dont know if exists or not
import { Request, Response, NextFunction } from 'express'
import createError from 'http-errors'
import { verifyAccessToken } from '../utils/jwt_utils/verify.jwt.utils'
import { reissueTokensAsync } from '../utils/jwt_utils/reissue.jwt.utils'

export const verifyUser = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//get refresh token from cookies
		const cookies = get(req, 'cookies')
		const accessToken = cookies.accessToken
		const refreshToken = cookies.refreshToken

		if (!accessToken || !refreshToken) throw new createError.Unauthorized()

		//verify access token
		const { valid, decoded, expired } = await verifyAccessToken(accessToken)

		//put user in res.locals
		if (valid && decoded && !expired) {
			res.locals.user = decoded //decoded has data passed when signing jwt i.e. userId
			return next()
		}

		//refreshing expired access token
		if (expired && refreshToken) {
			//reissue tokens
			const { newAccessToken } = await reissueTokensAsync(res, refreshToken)

			if (!newAccessToken) throw new createError.Unauthorized()

			//verify new access token
			const { valid, decoded, expired } = await verifyAccessToken(
				newAccessToken
			)

			if (!valid || !decoded || expired) throw new createError.Unauthorized()

			//put user in res.locals
			if (valid && decoded && !expired) {
				res.locals.user = decoded //decoded has data passed when signing jwt i.e. userId
				return next()
			}
		}
		next()
	} catch (error: any) {
		next(error)
	}
}
