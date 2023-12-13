import { TUser } from "./user.interface";
import { UserModel } from "./user.model";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const createUser = async (userData: TUser): Promise<TUser | any> => {
  const result = await UserModel.create(userData);
  return result;
};

const getAllUser = async (): Promise<TUser[]> => {
  const result = await UserModel.find(
    {},
    {
      userName: 1,
      fullName: 1,
      age: 1,
      email: 1,
      address: 1,
    },
  );
  return result;
};

export const userServices = {
  createUser,
  getAllUser,
};
