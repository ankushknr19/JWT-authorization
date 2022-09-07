import express from 'express'
import { verifyUser } from '../middlewares/verifyUser'

const router = express.Router()

router.route('/profile').get(verifyUser, (_req, res) => {
	res.send(`welcome user ${res.locals.user?.userId}`)
})

export default router
