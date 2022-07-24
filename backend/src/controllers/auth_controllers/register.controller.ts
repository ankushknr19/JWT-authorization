import dotenv from 'dotenv'
import { Request, Response } from 'express'
import { userModel } from '../../models/user.model'
import bcrypt from 'bcrypt'
import _ from 'lodash'

dotenv.config()

// @desc register a new user
// @route POST /api/users
// @access public

export const userRegisterController = async (req: Request, res: Response) => {
	try {
		//get data from req.body and validate it

		//the request object is already validated before coming here
		//using validate middleware in routes
		const { email, password } = req.body
		//check if email exists
		const checkDB = await userModel.findOne({ email }).select('email')
		if (checkDB) {
			throw new Error('email already exists')
		}

		//encrypt the password
		const saltRound = parseInt(process.env.SALT_ROUND!)
		const salt = await bcrypt.genSalt(saltRound)
		const hashedPassword = bcrypt.hashSync(password, salt)

		//save in database
		const newUser = await userModel.create({
			email,
			password: hashedPassword,
		})

		//send the response but omit the password
		res.status(200).json(_.omit(newUser.toJSON(), 'password'))
	} catch (error: any) {
		res.status(404).send(error.message)
	}
}
