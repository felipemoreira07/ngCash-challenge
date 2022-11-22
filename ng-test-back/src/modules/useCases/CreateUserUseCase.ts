import { CreateUserDto } from "../dtos/CreateUserDTO";
import { prisma } from "../../prisma/client";
import { AppError } from "../../error/AppError";

export class CreateUserUseCase {
  async execute({ username, password }: CreateUserDto) {
    // Verificar condições do username
    const usernameIsValid = username.trim().length < 3 ? false : true;

    if (!usernameIsValid) {
      throw new AppError("Username inválido: mínimo 3 caracteres");
    }

    // Verificar condições da password
    const passwordLengthIsValid = password.trim().length >= 8 ? true : false;
    const passwordHasNumber = /[0-9]/.test(password) ? true : false;

    const passwordHasUpperCase =
      password.toLowerCase() != password ? true : false;

    if (!passwordLengthIsValid || !passwordHasNumber || !passwordHasUpperCase) {
      throw new AppError(
        "Password inválido: mínimo 8 caracteres, 1 número e 1 letra maiúscula"
      );
    }

    // Verificar se o usuário já existe
    const userAlreadyExists = await prisma.user.findUnique({
      where: {
        username,
      },
    });

    if (userAlreadyExists) {
      throw new AppError("User already exists!");
    }

    // Criar a conta do usuário
    const newAccount = await prisma.account.create({
      data: {
        balance: "100",
      },
    });

    // Criar o usuário
    const newUser = await prisma.user.create({
      data: {
        username,
        password,
        accountId: newAccount.id,
      },
    });

    return newUser;
  }
}
