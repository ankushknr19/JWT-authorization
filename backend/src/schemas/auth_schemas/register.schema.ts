import Joi from 'joi'

export const userRegisterSchema = Joi.object({
	username: Joi.string()
		.pattern(new RegExp('^[a-z0-9_-]{3,15}$'))
		.required()
		.messages({
			'string.pattern.base': `invalid username`,
		}),
	email: Joi.string().email().lowercase().required(),
	password: Joi.string().min(6).max(30).required(),
	role: Joi.string().valid('user', 'moderator', 'admin'),
})
