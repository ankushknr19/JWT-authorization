import dotenv from 'dotenv'
import jwt from 'jsonwebtoken'
import { get } from 'lodash'
import { userModel } from '../../models/user.model'

dotenv.config()

//verify jwt access token
export const verifyAccessToken = (token: string) => {
	try {
		//decode token
		const decoded = jwt.verify(token, process.env.accessTokenSecretKey!)
		return {
			valid: true,
			expired: false,
			decoded,
		}
	} catch (error: any) {
		return {
			valid: false,
			expired: true,
			decoded: null,
		}
	}
}

//verify jwt refresh token
export const verifyRefreshToken = async (token: string) => {
	try {
		//decode token
		const decoded = jwt.verify(token, process.env.refreshTokenSecretKey!)

		//get refreshTokenId from database
		const dbSearch = await userModel
			.findById(get(decoded, 'userId'))
			.select('refreshTokenId')

		if (!dbSearch) {
			throw new Error()
		}

		//compare uuid with that in database
		if (get(decoded, 'id') !== dbSearch.refreshTokenId) {
			throw new Error()
		}

		return {
			valid: true,
			expired: false,
			decoded,
		}
	} catch (error: any) {
		return {
			valid: false,
			expired: true,
			decoded: null,
		}
	}
}
