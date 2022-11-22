import { prisma } from "../../prisma/client";

export class GetUserByUsernameUseCase {
  async execute(username: string) {
    const user = await prisma.user.findUnique({
      where: {
        username,
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
