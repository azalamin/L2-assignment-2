import express from "express";
import { userController } from "./user.controller";

const route = express.Router();

route.post("/", userController.createUser);
route.get("/", userController.getAllUser);
route.get("/:userId", userController.getSingleUser);
route.put("/:userId", userController.updateSingleUser);
route.delete("/:userId", userController.deleteSingleUser);
route.put("/:userId/orders", userController.addOrder);

export const userRoutes = route;
