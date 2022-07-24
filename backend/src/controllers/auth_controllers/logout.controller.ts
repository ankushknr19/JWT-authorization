import { Request, Response } from 'express'
import { userModel } from '../../models/user.model'

export const userLogoutController = async (_req: Request, res: Response) => {
	try {
		const userId = res.locals.user.userId
		const user = await userModel.findById(userId)

		if (!user) throw new Error()

		await userModel.updateOne(
			{ _id: userId },
			{ $unset: { refreshTokenId: '' } }
		)

		res.clearCookie('accessToken', { path: '/', httpOnly: true })

		res.clearCookie('refreshToken', { path: '/', httpOnly: true })

		res.status(200).send('logged out successfully')
	} catch (error: any) {
		res.status(404).send('logout failed')
	}
}
