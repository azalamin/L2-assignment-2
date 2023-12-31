/* eslint-disable @typescript-eslint/no-this-alias */
import bcrypt from "bcrypt";
import { Schema, model } from "mongoose";
import config from "../../config";
import {
  TAddress,
  TFullName,
  TOrders,
  TUser,
  TUserMethods,
  UserModel,
} from "./user.interface";

const nameSchema = new Schema<TFullName>({
  firstName: {
    type: String,
    required: [true, "First name is required"],
    minlength: 1,
  },
  lastName: {
    type: String,
    required: [true, "Last name is required"],
  },
});

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
});

const orderSchema = new Schema<TOrders>({
  productName: {
    type: String,
    // required: [true, "Product name is required"],
  },
  quantity: {
    type: Number,
    // required: [true, "Quantity is required"],
  },
  price: {
    type: Number,
    // required: [true, "Price is required"],
  },
});

const userSchema = new Schema<TUser, UserModel, TUserMethods>({
  userId: {
    type: Number,
    required: [true, "User id must be number and unique!"],
    unique: true,
  },
  userName: {
    type: String,
    required: true,
    minlength: 3,
    unique: true,
    lowercase: true,
    validate: {
      // Custom validator function for checking spaces
      validator: function (value: string) {
        return !/\s/.test(value); // Returns true if there are no spaces
      },
      message: "Username must not contain any spaces",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    select: false,
  },
  fullName: nameSchema,
  age: Number,
  email: {
    type: String,
    required: [true, "Please give a valid email"],
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
  orders: [orderSchema],
});

// check is user exists or not
userSchema.methods.isUserExists = async function (userId) {
  const existingUser = await User.findOne({ userId });

  return existingUser;
};

// hashing password
userSchema.pre("save", async function (next) {
  const user = this;
  user.password = await bcrypt.hash(
    user.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// Exclude password in response
userSchema.methods.toJSON = function () {
  const userObject = this.toObject();
  delete userObject.password;
  delete userObject.orders;
  return userObject;
};

export const User = model<TUser, UserModel>("User", userSchema);
