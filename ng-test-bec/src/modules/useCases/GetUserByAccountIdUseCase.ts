import { prisma } from "../../prisma/client";

export class GetUserByAccountIdUseCase {
  async execute(accountId: number) {
    const user = await prisma.user.findUnique({
      where: {
        accountId,
      },
      include: {
        account: {
          select: {
            balance: true,
            creditedTransactions: true,
            debitedTransactions: true,
          },
        },
      },
    });

    return user;
  }
}
