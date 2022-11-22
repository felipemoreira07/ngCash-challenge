import { prisma } from "../../prisma/client";

export class GetTransactionsByAccountIdUseCase {
  async execute(accountId: number) {
    const debitedTransactions = await prisma.transactions
      .findMany({
        where: {
          debitedAccountId: accountId,
        },
        include: {
          debitedAccount: {
            include: {
              user: true,
            },
          },
          creditedAccount: {
            include: {
              user: true,
            },
          },
        },
      })
      // Formatando debited transactions
      .then((_result) =>
        _result.map((item) => ({
          ...item,
          transaction_type: "debited",
          value: Number(item.value) * -1,
        }))
      );

    const creditedTransactions = await prisma.transactions
      .findMany({
        where: {
          creditedAccountId: accountId,
        },
        include: {
          debitedAccount: {
            include: {
              user: true,
            },
          },
          creditedAccount: {
            include: {
              user: true,
            },
          },
        },
      })
      // Formatando credited transactions
      .then((_result) =>
        _result.map((item) => ({
          ...item,
          transaction_type: "credited",
          value: Number(item.value),
        }))
      );

    const data = [...debitedTransactions, ...creditedTransactions];

    const result = data.map((item) => ({
      id: item.id,
      date: item.createdAt,
      value: item.value,
      payer: item.debitedAccount?.user?.username,
      receiver: item.creditedAccount?.user?.username,
      transaction_type: item.transaction_type,
    }));

    return result;
  }
}
