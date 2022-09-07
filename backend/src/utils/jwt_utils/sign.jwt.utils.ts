import { Response } from 'express'
import createHttpError from 'http-errors'
import jwt from 'jsonwebtoken'
import { v4 as uuidv4 } from 'uuid'
import {
	ACCESS_TOKEN_SECRET_KEY,
	ACCESS_TOKEN_TIME_TO_LIVE,
	REFRESH_TOKEN_SECRET_KEY,
	REFRESH_TOKEN_TIME_TO_LIVE,
} from '../../config/env'

//sign jwt access token async
export const signAccessTokenAsync = (res: Response, payload: object) => {
	return new Promise<string | undefined>((resolve, reject) => {
		jwt.sign(
			payload,
			ACCESS_TOKEN_SECRET_KEY!,
			{
				expiresIn: ACCESS_TOKEN_TIME_TO_LIVE!,
			},
			(err, accessToken) => {
				if (err) {
					return reject(new createHttpError.InternalServerError())
				}
				res.cookie('accessToken', accessToken, {
					path: '/',
					maxAge: 30 * 24 * 60 * 60,
					httpOnly: true,
				})
				resolve(accessToken)
			}
		)
	})
}
//sign jwt refresh token async
export const signRefreshTokenAsync = (res: Response, userId: any) => {
	return new Promise<{
		refreshToken: string | undefined
		refreshTokenId: string
	}>((resolve, reject) => {
		const refreshTokenId = uuidv4()
		jwt.sign(
			{
				id: refreshTokenId,
				userId,
			},
			REFRESH_TOKEN_SECRET_KEY!,
			{
				expiresIn: REFRESH_TOKEN_TIME_TO_LIVE!,
			},
			(err, refreshToken) => {
				if (err) {
					return reject(new createHttpError.InternalServerError())
				}
				res.cookie('refreshToken', refreshToken, {
					path: '/',
					maxAge: 30 * 24 * 60 * 60,
					httpOnly: true,
				})
				resolve({ refreshToken, refreshTokenId })
			}
		)
	})
}
