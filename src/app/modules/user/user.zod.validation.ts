import { z } from 'zod'

const nameValidationZodSchema = z.object({
  firstName: z.string().trim(),
  lastName: z.string().trim(),
})

const addressValidationZodSchema = z.object({
  street: z.string().trim(),
  city: z.string().trim(),
  country: z.string().trim(),
})

const userZodValidationSchema = z.object({
  userId: z.number().positive({ message: 'User id must be positive' }),
  userName: z.string().trim().min(3),
  password: z.string().trim().min(6).max(20),
  fullName: nameValidationZodSchema,
  age: z.number().positive({ message: 'Age must be a valid number' }),
  email: z.string().email({ message: 'Enter a valid email' }).trim(),
  isActive: z.boolean().default(true),
  hobbies: z.string().array(),
  address: addressValidationZodSchema,
})

export default userZodValidationSchema
