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

const getSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const result = await userServices.getSingleUser(userId);

    res.status(200).json({
      success: true,
      message: "User fetched successfully!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const updateSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    const userData = req.body;
    const result = await userServices.updateSingleUser(userId, userData);

    res.status(200).json({
      success: true,
      message: "User updated successfully!",
      data: result,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

const deleteSingleUser = async (req: Request, res: Response): Promise<void> => {
  try {
    const userId = req.params.userId;
    await userServices.deleteSingleUser(userId);

    res.status(200).json({
      success: true,
      message: "User deleted successfully!",
      data: null,
    });
  } catch (error) {
    res.status(404).json({
      success: false,
      message: "User not found",
      error: {
        code: 404,
        description: "User not found!",
      },
    });
  }
};

export const userController = {
  createUser,
  getAllUser,
  getSingleUser,
  updateSingleUser,
  deleteSingleUser,
};
