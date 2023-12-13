import { Schema, model } from 'mongoose'
import { TAddress, TFullName, TUser } from './user.interface'

const nameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, 'First name is required'],
    minlength: 1,
  },
  lastName: {
    type: String,
    required: [true, 'Last name is required'],
  },
})

const addressSchema = new Schema<TAddress>({
  street: {
    type: String,
  },
  city: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },
})

const userSchema = new Schema<TUser>({
  userId: {
    type: Number,
    required: [true, 'User id must be number and unique!'],
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
  },
  fullName: nameSchema,
  age: Number,
  email: {
    type: String,
    required: [true, 'Please give a valid email'],
    unique: true,
  },
  isActive: {
    type: Boolean,
    default: true,
  },
  hobbies: {
    type: [String],
  },
  address: addressSchema,
})

export const UserModel = model<TUser>('User', userSchema)
