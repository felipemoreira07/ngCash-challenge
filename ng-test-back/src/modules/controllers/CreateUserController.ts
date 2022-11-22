import { Request, Response } from "express";
import { CreateUserUseCase } from "../useCases/CreateUserUseCase";

export class CreateUserController {
  async handle(req: Request, res: Response) {
    const { username, password } = req.body;

    const createUserUseCase = new CreateUserUseCase();

    const result = await createUserUseCase.execute({ username, password });

    return res.status(201).json(result);
  }
}
