import { prisma } from "../../prisma/client";
import { CreateTransactionDto } from "../dtos/CreateTransactionDTO";
import { AppError } from "../../error/AppError";

export class CreateTransactionUseCase {
  async execute({
    creditedUsername,
    debitedUsername,
    debitedUserBalance,
    transactionValue,
  }: CreateTransactionDto) {
    //Verificar se creditedUsername é válido
    const creditedUsernameIsValid = await prisma.user.findUnique({
      where: {
        username: creditedUsername,
      },
    });

    if (!creditedUsernameIsValid) {
      throw new AppError("Receptor não existe");
    }
    if (creditedUsername === debitedUsername) {
      throw new AppError("Impossível realizar transferência para você mesmo");
    }

    //Verificar se o saldo é suficiente para transação
    const debitedUserBalanceNumber = parseFloat(debitedUserBalance);
    const transactionValueNumber = parseFloat(transactionValue);

    if (debitedUserBalanceNumber < transactionValueNumber) {
      throw new AppError("Saldo insuficiente para essa operação");
    }

    //Pegar id do emissor e do receptor
    const creditedUser = await prisma.user.findUnique({
      where: {
        username: creditedUsername,
      },
    });

    const creditUserAccount = await prisma.account.findUnique({
      where: {
        id: creditedUser?.accountId,
      },
    });

    const debitedUser = await prisma.user.findUnique({
      where: {
        username: debitedUsername,
      },
    });

    const debitedUserAccount = await prisma.account.findUnique({
      where: {
        id: debitedUser?.accountId,
      },
    });

    const creditedUserId = creditedUser?.id;
    const debitedUserId = debitedUser?.id;

    //Criar a transação
    const newTransaction = await prisma.transactions.create({
      data: {
        value: transactionValue,
        creditedAccountId: creditedUserId,
        debitedAccountId: debitedUserId,
      },
    });

    //Atualizar o balance de quem recebeu
    await prisma.user.update({
      where: {
        id: creditedUser?.id,
      },
      data: {
        account: {
          update: {
            balance: String(
              Number(creditUserAccount?.balance) + Number(transactionValue)
            ),
          },
        },
      },
    });

    //Atualizar o balance de quem pagou
    await prisma.user.update({
      where: {
        id: debitedUser?.id,
      },
      data: {
        account: {
          update: {
            balance: String(
              Number(debitedUserAccount?.balance) - Number(transactionValue)
            ),
          },
        },
      },
    });

    return newTransaction;
  }
}
