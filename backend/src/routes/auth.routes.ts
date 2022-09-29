import express from 'express'
import { userLoginController } from '../controllers/auth_controllers/login.controller'
import { userRegisterController } from '../controllers/auth_controllers/register.controller'
import { userLogoutController } from '../controllers/auth_controllers/logout.controller'
import { requireUser } from '../middlewares/requireUser'

const router = express.Router()

router.post('/login', userLoginController)

router.route('/register').post(userRegisterController)

router.post('/logout', requireUser, userLogoutController)

export default router
