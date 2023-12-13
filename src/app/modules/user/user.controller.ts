import { Request, Response } from 'express'
import { TUser } from './user.interface'
import { userServices } from './user.service'
import userZodValidationSchema from './user.zod.validation'

const createUser = async (req: Request, res: Response) => {
  try {
    const userData: TUser = req.body
    const validateUserData = userZodValidationSchema.parse(userData)
    const result = await userServices.createUser(validateUserData)

    res.status(200).json({
      success: true,
      message: 'User created successfully!',
      data: result,
    })
  } catch (error) {
    res.status(500).json({
      success: false,
      message: 'Something went wrong',
      error: {
        code: 500,
        description:
          'Please make sure email, username, and user id is unique. Try again!',
      },
    })
  }
}

export const userController = {
  createUser,
}
