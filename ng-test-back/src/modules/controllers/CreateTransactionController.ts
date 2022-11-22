import { Request, Response } from "express";
import { CreateTransactionUseCase } from "../useCases/CreateTransactionUseCase";

export class CreateTransactionController {
  async handle(req: Request, res: Response) {
    const {
      creditedUsername,
      debitedUsername,
      debitedUserBalance,
      transactionValue,
    } = req.body;

    const createTransactionUseCase = new CreateTransactionUseCase();

    const result = await createTransactionUseCase.execute({
      creditedUsername,
      debitedUsername,
      debitedUserBalance,
      transactionValue,
    });

    return res.status(201).json(result);
  }
}
