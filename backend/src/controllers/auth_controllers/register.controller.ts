import createError from 'http-errors'
import { NextFunction, Request, Response } from 'express'
import { UserModel } from '../../models/user.model'
import _ from 'lodash'
import { userRegisterSchema } from '../../schemas/auth_schemas/register.schema'

// @desc register a new user
// @route POST /api/auth/register
// @access public

export const userRegisterController = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		//get data from req.body and validate it
		const result = await userRegisterSchema.validateAsync(req.body)

		const { email, password } = result

		//check if email exists
		const checkDB = await UserModel.findOne({ email }).select('email')
		if (checkDB) {
			throw new createError.Conflict('User already exists')
		}

		//encrypt the password
		//done using pre hook inside user model

		//save in database
		const newUser = await UserModel.create({
			email,
			password,
		})

		//send the response but omit the password
		res.status(200).json(_.omit(newUser.toJSON(), 'password'))
	} catch (error: any) {
		//422 = unprocessable entity
		if (error.isJoi) error.status = 422

		next(error)
	}
}
