import { TUser } from './user.interface'
import { UserModel } from './user.model'

const createUser = async (userData: TUser): Promise<TUser> => {
  const result = await UserModel.create(userData)

  return result
}

export const userServices = {
  createUser,
}
