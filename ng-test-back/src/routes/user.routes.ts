import { Router } from "express";
import { isAuthenticated } from "../middleware";
import { CreateUserController } from "../modules/controllers/CreateUserController";
import { GetUserByUsernameController } from "../modules/controllers/GetUserByUsernameController";
import { GetUserByAccountIdController } from "../modules/controllers/GetUserByAccountIdController";

const createUserController = new CreateUserController();
const getUserByUsernameController = new GetUserByUsernameController();
const getUserByAccountIdController = new GetUserByAccountIdController();

const userRoutes = Router();

userRoutes.post("/", createUserController.handle);
userRoutes.get(
  "/:username",
  isAuthenticated,
  getUserByUsernameController.handle
);
userRoutes.get(
  "/account/:accountId",
  isAuthenticated,
  getUserByAccountIdController.handle
);

export { userRoutes };
