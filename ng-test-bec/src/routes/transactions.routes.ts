import { Router } from "express";
import { isAuthenticated } from "../middleware";
import { CreateTransactionController } from "../modules/controllers/CreateTransactionController";
import { GetTransactionsByAccountIdController } from "../modules/controllers/GetTransactionsByAccountIdController";

const createTransactionController = new CreateTransactionController();
const getTransactionsByAccountIdController =
  new GetTransactionsByAccountIdController();

const transactionsRoutes = Router();

transactionsRoutes.post(
  "/",
  isAuthenticated,
  createTransactionController.handle
);
transactionsRoutes.get(
  "/:accountId",
  isAuthenticated,
  getTransactionsByAccountIdController.handle
);

export { transactionsRoutes };
