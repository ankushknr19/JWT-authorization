import express from 'express'
import { getProfileController } from '../controllers/user_controllers/profile.controller'
import {
	checkLoggedInUser,
	requireAdmin,
	requireUser,
} from '../middlewares/requireUser'

const router = express.Router()

router.get('/home', async (_req, res) => {
	const user = res.locals.user
	res.render('home', { user })
})
router.get('/login', async (_req, res) => {
	res.render('login', { messageObject: null })
})

//check if
router.route('/register').get(checkLoggedInUser, async (_req, res) => {
	res.render('register', { error: null })
})

//private route profile
router.route('/profile').get(requireUser, getProfileController)

//private admin route
router
	.route('/admin')
	.get(requireAdmin, async (_req, res) => res.render('admin'))

export default router
