import mongoose, { Schema } from 'mongoose'

const userSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		refreshTokenId: { type: String },
	},
	{ timestamps: true }
)

export const userModel = mongoose.model('User', userSchema)
