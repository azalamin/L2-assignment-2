import { Request, Response } from "express";
import { TUser } from "./user.interface";
import { userServices } from "./user.service";
import userZodValidationSchema from "./user.zod.validation";

const createUser = async (req: Request, res: Response) => {
  try {
    const userData: TUser = req.body;
    const validateUserData = userZodValidationSchema.parse(userData);
    const result = await userServices.createUser(validateUserData);

    res.status(200).json({
      success: true,
      message: "User created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: {
        code: 500,
        description:
          "Please make sure email, username(no space), and user id is unique. Try again!",
        error,
      },
    });
  }
};

const getAllUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const result = await userServices.getAllUser();

    res.status(200).json({
      success: true,
      message: "Users fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Something went wrong",
      error: {
        code: 500,
        description:
          "Please make sure email, username(no space), and user id is unique. Try again!",
        error,
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
};
