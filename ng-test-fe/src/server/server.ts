import axios from "axios";

interface IUser {
  username: string;
  password: string;
}

interface ITransaction {
  creditedUsername: string;
  debitedUsername: string;
  debitedUserBalance: string;
  transactionValue: string;
}

export const postRegister = async (user: IUser) => {
  const url = `${process.env.REACT_APP_API_URL}/users`;

  return axios({
    url,
    method: "post",
    data: {
      username: user.username,
      password: user.password,
    },
  });
};

export const postLogin = (user: IUser) => {
  const url = `${process.env.REACT_APP_API_URL}/login`;

  return axios({
    url,
    method: "post",
    data: {
      username: user.username,
      password: user.password,
    },
  });
};

export const postTransaction = (
  token: string,
  {
    creditedUsername,
    debitedUsername,
    debitedUserBalance,
    transactionValue,
  }: ITransaction
) => {
  const url = `${process.env.REACT_APP_API_URL}/transactions`;

  return axios({
    url,
    method: "post",
    data: {
      creditedUsername,
      debitedUsername,
      debitedUserBalance,
      transactionValue,
    },
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getTransactions = (token: string, accountId: number) => {
  const url = `${process.env.REACT_APP_API_URL}/transactions/${accountId}`;

  return axios({
    url,
    method: "get",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getUserByUsername = (token: string, username: string) => {
  const url = `${process.env.REACT_APP_API_URL}/users/${username}`;

  return axios({
    url,
    method: "get",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};

export const getUserByAccountId = (token: string, accountId: string) => {
  const url = `${process.env.REACT_APP_API_URL}/users/${accountId}`;

  return axios({
    url,
    method: "get",
    headers: {
      authorization: `Bearer ${token}`,
    },
  });
};
