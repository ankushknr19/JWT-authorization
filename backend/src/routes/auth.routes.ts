import express from 'express'
import { userLoginController } from '../controllers/auth_controllers/login.controller'
import { userRegisterController } from '../controllers/auth_controllers/register.controller'
import { userLogoutController } from '../controllers/auth_controllers/logout.controller'
import { verifyUser } from '../middlewares/verifyUser'

const router = express.Router()

router.post('/login', userLoginController)

router.post('/register', userRegisterController)

router.delete('/logout', verifyUser, userLogoutController)

export default router
