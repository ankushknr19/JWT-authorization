import jwt from 'jsonwebtoken'
import { get } from 'lodash'
import {
	ACCESS_TOKEN_SECRET_KEY,
	REFRESH_TOKEN_SECRET_KEY,
} from '../../config/env'
import { UserModel } from '../../models/user.model'

//verify jwt access token
export const verifyAccessToken = async (token: string) => {
	try {
		//decode token
		const decoded = jwt.verify(token, ACCESS_TOKEN_SECRET_KEY!)

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
		const decoded = jwt.verify(token, REFRESH_TOKEN_SECRET_KEY!)

		//get refreshTokenId from database
		const dbSearch = await UserModel.findById(get(decoded, 'userId')).select(
			'refreshTokenId'
		)

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
