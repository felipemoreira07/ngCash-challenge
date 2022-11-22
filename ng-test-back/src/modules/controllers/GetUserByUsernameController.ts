import { Request, Response } from "express";
import { prisma } from "../../prisma/client";
import { GetUserByUsernameUseCase } from "../useCases/GetUserByUsernameUseCase";

export class GetUserByUsernameController {
  async handle(req: Request, res: Response) {
    const { username } = req.params;
    const getUserUseCase = new GetUserByUsernameUseCase();

    const result = await getUserUseCase.execute(username);

    return res.status(200).json(result);
  }
}
