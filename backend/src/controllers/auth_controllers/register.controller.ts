import { Request, Response } from 'express'
import { UserModel } from '../../models/user.model'
import _ from 'lodash'
import createHttpError from 'http-errors'
import { userRegisterSchema } from '../../schemas/auth_schemas/register.schema'

// @desc register a new user
// @route POST /api/users
// @access public

export const userRegisterController = async (req: Request, res: Response) => {
	try {
		//get data from req.body and validate it
		const result = await userRegisterSchema.validateAsync(req.body)

		//desctructure data
		const { username, email, password, role } = result

		//check if email exists
		const checkDB = await UserModel.findOne({ email }).select('email')
		if (checkDB) {
			throw new createHttpError.Conflict('email already exists')
		}

		//encrypt the password
		//done using pre hook inside user model

		//save in database
		await UserModel.create({
			username,
			email,
			password,
			role,
		})

		//send the response but omit the password
		// res.status(200).json(_.omit(newUser.toJSON(), 'password'))

		const messageObject = {
			status: 200,
			message: 'User registered successfully! Please login.',
		}
		res.render('login', { messageObject })
	} catch (error: any) {
		if (error.isJoi) error.status = 422
		res.render('register', { error })
	}
}
