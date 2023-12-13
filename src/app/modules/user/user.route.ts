import express from "express";
import { userController } from "./user.controller";

const route = express.Router();

route.post("/", userController.createUser);
route.get("/", userController.getAllUser);

export const userRoutes = route;
