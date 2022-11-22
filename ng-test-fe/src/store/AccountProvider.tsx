import React from "react";
import AccountContext from "./account-context";

interface AccountProviderProps {
  children: React.ReactNode;
}

interface AccountContextDTO {
  user: {};
  balance: string;
  addUser: (user: User) => void;
}

interface User {
  id: number;
  username: string;
  balance: string;
}

const AccountProvider = (props: AccountProviderProps) => {
  const addUser = (user: any) => {
    accountContext.user = user;
    accountContext.balance = user.account.balance;
  };

  const accountContext: AccountContextDTO = {
    user: {},
    balance: "",
    addUser,
  };
  return (
    <AccountContext.Provider value={accountContext}>
      {props.children}
    </AccountContext.Provider>
  );
};

export default AccountProvider;
