import { Request, Response } from "express";
import { prisma } from "../../prisma/client";
import { GetUserByAccountIdUseCase } from "../useCases/GetUserByAccountIdUseCase";

export class GetUserByAccountIdController {
  async handle(req: Request, res: Response) {
    const { accountId } = req.params;
    const getUserUseCase = new GetUserByAccountIdUseCase();

    const result = await getUserUseCase.execute(Number(accountId));

    return res.status(200).json(result);
  }
}
