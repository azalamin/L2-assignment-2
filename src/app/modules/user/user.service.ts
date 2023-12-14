import { TOrders, TUser } from "./user.interface";
import { UserModel } from "./user.model";

const createUser = async (userData: TUser): Promise<TUser> => {
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
      _id: 0,
    },
  );
  return result;
};

const getSingleUser = async (userId: string): Promise<TUser | null> => {
  const result = await UserModel.findById(userId, {
    _id: 0,
    orders: 0,
  });
  return result;
};

const updateSingleUser = async (
  userId: string,
  userData: TUser,
): Promise<TUser | null> => {
  const result = await UserModel.findByIdAndUpdate(userId, userData, {
    new: true,
    runValidators: true,
  });
  return result;
};

const deleteSingleUser = async (
  userId: string,
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
): Promise<TUser | null | any> => {
  const result = await UserModel.findByIdAndDelete(userId);
  return result;
};

const addNewProduct = async (
  userId: string,
  orderData: TOrders,
): Promise<TUser | null> => {
  const user = await UserModel.findById(userId);
  // if user not exists throw an error
  if (!user) {
    throw new Error("User not exists");
  }

  if (user.orders) {
    user.orders.push(orderData);
  } else {
    user.orders = [orderData];
  }

  const result = await user.save();
  return result;
};

const getUserOrders = async (userId: string): Promise<TUser | null> => {
  const result = await UserModel.findOne({ _id: userId });

  if (result?.orders?.length) {
    return result;
  } else {
    throw new Error("Orders not found");
  }
};

export const userServices = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addNewProduct,
  getUserOrders,
};
