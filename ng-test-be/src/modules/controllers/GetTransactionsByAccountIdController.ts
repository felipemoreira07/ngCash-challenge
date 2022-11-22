import { Request, Response } from "express";
import { GetTransactionsByAccountIdUseCase } from "../useCases/GetTransactionsByAccountIdUseCase";

export class GetTransactionsByAccountIdController {
  async handle(req: Request, res: Response) {
    const { accountId } = req.params;
    const getTransactionsByAccountIdController =
      new GetTransactionsByAccountIdUseCase();

    const result = await getTransactionsByAccountIdController.execute(
      Number(accountId)
    );

    return res.status(200).json(result);
  }
}
