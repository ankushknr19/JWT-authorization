import mongoose, { Schema } from 'mongoose'

const UserSchema = new Schema(
	{
		email: { type: String, required: true, unique: true },
		password: { type: String, required: true },
		refreshTokenId: { type: String },
	},
	{ timestamps: true }
)

export const UserModel = mongoose.model('User', UserSchema)
