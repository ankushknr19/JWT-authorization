import mongoose, { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import { SALT_ROUND } from '../config/env'

export interface UserInput {
	username: string
	email: string
	password: string
	role: string
	refreshTokenId: string
}

export interface UserDocument extends UserInput, mongoose.Document {
	createdAt: Date
	updatedAt: Date
	comparePassword(password: string): Promise<Boolean>
}

const UserSchema = new Schema<UserDocument>(
	{
		username: { type: String, required: true },
		email: { type: String, required: true, lowercase: true, unique: true },
		password: { type: String, required: true },
		role: {
			type: String,
			enum: ['user', 'moderator', 'admin'],
			default: 'user',
			required: true,
		},

		refreshTokenId: { type: String },
	},
	{ timestamps: true }
)

//pre hook runs before saving the document

UserSchema.pre('save', async function (next) {
	try {
		//encrypt password only when creating new password
		//i.e when it is modified.
		if (!this.isModified('password')) {
			return next()
		}
		const saltRound = parseInt(SALT_ROUND!)
		const salt = await bcrypt.genSalt(saltRound)
		const hashedPassword = bcrypt.hashSync(this.password, salt)
		this.password = hashedPassword
	} catch (error: any) {
		next(error)
	}
})

//method to compare raw password with encrypted
UserSchema.methods.comparePassword = async function (password: string) {
	try {
		return await bcrypt.compare(password, this.password)
	} catch (error: any) {
		return false
	}

	// return await bcrypt.compare(password, this.password).catch(()=> false)
}

export const UserModel = mongoose.model<UserDocument>('User', UserSchema)
