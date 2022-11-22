import { Router } from "express";
import { userRoutes } from "./user.routes";
import { transactionsRoutes } from "./transactions.routes";

import { GetUserByUsernameUseCase } from "../modules/useCases/GetUserByUsernameUseCase";

import { v4 as uuidv4 } from "uuid";
import { generateTokens } from "../utils/jwt";
import { addRefreshTokenToWhitelist } from "../api/auth/auth.services";
import { isAuthenticated } from "../middleware";

const routes = Router();

routes.use("/users", userRoutes);
routes.use("/transactions", transactionsRoutes);

const bcrypt = require("bcrypt");

const getUserUseCase = new GetUserByUsernameUseCase();

routes.post("/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) {
      res.status(400);
      throw new Error("You must provide an email and a password.");
    }

    const existingUser = await getUserUseCase.execute(username);

    if (!existingUser) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const validPassword = existingUser.password === password;

    if (!validPassword) {
      res.status(403);
      throw new Error("Invalid login credentials.");
    }

    const jti = uuidv4();
    const { accessToken, refreshToken } = generateTokens(existingUser, jti);
    await addRefreshTokenToWhitelist({
      jti,
      refreshToken,
      userId: existingUser.id,
    });

    res.json({
      accessToken,
      refreshToken,
      user: existingUser,
    });
  } catch (err) {
    next(err);
  }
});

routes.get("/profile/:username", isAuthenticated, async (req, res, next) => {
  try {
    const { username } = req.params;
    const user = await getUserUseCase.execute(username);
    res.json(user);
  } catch (err) {
    next(err);
  }
});

export { routes };
