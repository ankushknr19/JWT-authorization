import Joi from 'joi'

export const userLoginSchema = Joi.object({
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().min(6).max(30).required(),
})
