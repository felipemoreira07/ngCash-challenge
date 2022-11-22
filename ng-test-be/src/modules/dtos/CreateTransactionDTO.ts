export interface CreateTransactionDto {
  creditedUsername: string;
  debitedUsername: string;
  transactionValue: string;
  debitedUserBalance: string;
}
