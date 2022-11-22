import React from "react";

interface User {
  id: number;
  username: string;
  balance: string;
}

interface AccountContextDTO {
  user: any;
  balance: string;
  addUser: (user: User) => void;
}

const AccountContext = React.createContext<AccountContextDTO>({
  user: {},
  balance: "",
  addUser: (user: User) => {},
});

export default AccountContext;
