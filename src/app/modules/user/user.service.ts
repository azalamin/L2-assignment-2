import { TOrders, TUser } from "./user.interface";
import { User } from "./user.model";

const createUser = async (userData: TUser): Promise<TUser> => {
  const user = new User(userData);
  if (await user.isUserExists(userData.userId)) {
    throw new Error("User already exists");
  }
  const result = await user.save();
  return result;
};

const getAllUser = async (): Promise<TUser[]> => {
  const result = await User.find(
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

const getSingleUser = async (userId: number): Promise<TUser | null> => {
  // check user exist or not
  const user = new User();
  if (!(await user.isUserExists(userId))) {
    throw new Error("User not found");
  }
  const result = await User.findOne(
    { userId },
    {
      _id: 0,
      orders: 0,
    },
  );
  return result;
};

const updateSingleUser = async (
  userId: number,
  userData: TUser,
): Promise<TUser | null> => {
  // check user exist or not
  const user = new User();
  if (!(await user.isUserExists(userId))) {
    throw new Error("User not found");
  }

  const result = await User.findOneAndUpdate({ userId }, userData, {
    new: true,
    runValidators: true,
  }).select({ orders: 0 });
  return result;
};

const deleteSingleUser = async (userId: number): Promise<TUser | null> => {
  // check user exist or not
  const user = new User();
  if (!(await user.isUserExists(userId))) {
    throw new Error("User not found");
  }

  const result = await User.findOneAndDelete({ userId });
  return result;
};

const addNewProduct = async (
  userId: number,
  orderData: TOrders,
): Promise<TUser | null> => {
  // check user exist or not
  const user = new User();
  if (!(await user.isUserExists(userId))) {
    throw new Error("User not found");
  }

  const result = await User.findOneAndUpdate(
    { userId },
    {
      $push: {
        orders: orderData,
      },
    },
    {
      new: true,
    },
  );

  return result;
};

const getUserOrders = async (userId: number): Promise<TUser | null> => {
  // check user exist or not
  const user = new User();
  if (!(await user.isUserExists(userId))) {
    throw new Error("User not found");
  }

  const result = await User.findOne({ userId });
  if (result?.orders?.length) {
    return result;
  } else {
    throw new Error("Orders not found");
  }
};

const getUserOrdersTotal = async (userId: number) => {
  // check user exist or not
  const user = new User();
  if (!(await user.isUserExists(userId))) {
    throw new Error("User not found");
  }

  const result = await User.aggregate([
    { $match: { userId } },
    // Deconstruct the orders array
    { $unwind: "$orders" },
    {
      $group: {
        _id: "$userId",
        // Calculate the total price
        totalPrice: { $sum: "$orders.price" },
      },
    },
  ]);
  return result;
};

export const userServices = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
  addNewProduct,
  getUserOrders,
  getUserOrdersTotal,
};
