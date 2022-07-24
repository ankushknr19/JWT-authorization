import express, { Request, Response } from 'express'
import { verifyUser } from '../middlewares/verifyUser'

const router = express.Router()

router.route('/profile').get(verifyUser, (_req: Request, res: Response) => {
	res.status(200).send(`welcome user ${res.locals.user?.userId}`)
})

export default router
