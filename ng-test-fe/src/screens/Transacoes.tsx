import { useContext, useEffect, useState } from "react";
import useToken from "../hooks/useToken";
import AccountContext from "../store/account-context";
import { getTransactions } from "../server/server";

import { Box } from "@mui/material";
import SubMenu from "../components/SubMenu";
import CssButton from "../components/styled/CssButton";
import TransactionItem from "../components/TransactionItem";
import BackgroundBox from "../components/styled/BackgroundBox";
import InfoBox from "../components/styled/InfoBox";
import { styled } from "@mui/material/styles";

const StyledButtonsBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  gap: "1rem",
}));

const TransactionsBox = styled(Box)(() => ({
  padding: "2rem",
}));

const selectButtons = [
  {
    name: "Todas",
    type: "all",
  },
  {
    name: "Cash-in",
    type: "credited",
  },
  {
    name: "Cash-out",
    type: "debited",
  },
  {
    name: "Hoje",
    type: "today",
  },
  {
    name: "Última semana",
    type: "lastWeek",
  },
  {
    name: "Último mês",
    type: "lastMonth",
  },
];

const Transacoes = () => {
  const accountCtx = useContext(AccountContext);
  const token = useToken();
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("all");

  useEffect(() => {
    const fetch = async () => {
      const { data } = await getTransactions(token, accountCtx.user.accountId);
      setTransactions(data);
    };
    fetch();
  }, [accountCtx, token]);

  return (
    <BackgroundBox>
      <SubMenu />
      <InfoBox>
        <StyledButtonsBox>
          {selectButtons.map((button) => (
            <CssButton
              onClick={() => setTransactionType(button.type)}
              variant="contained"
              disableRipple
            >
              {button.name}
            </CssButton>
          ))}
        </StyledButtonsBox>

        <TransactionsBox>
          {transactions.map((item: any) => {
            const itemDay = item.date.slice(8, 10);
            const itemMonth = item.date.slice(5, 7);
            const itemYear = item.date.slice(0, 4);
            const datetime = `${itemDay}/${itemMonth}/${itemYear}`;

            const today = new Date();
            const actualDay = String(today.getDate()).padStart(2, "0");
            const actualMonth = String(today.getMonth() + 1).padStart(2, "0");
            const actualYear = String(today.getFullYear());

            if (transactionType === "debited") {
              return (
                item.transaction_type === "debited" && (
                  <TransactionItem
                    id={item.id}
                    key={item.id}
                    payer={item.payer}
                    receiver={item.receiver}
                    value={item.value}
                    date={datetime}
                    transaction_type={item.transaction_type}
                  />
                )
              );
            }
            if (transactionType === "credited") {
              return (
                item.transaction_type === "credited" && (
                  <TransactionItem
                    id={item.id}
                    key={item.id}
                    payer={item.payer}
                    receiver={item.receiver}
                    value={item.value}
                    date={datetime}
                    transaction_type={item.transaction_type}
                  />
                )
              );
            }
            if (transactionType === "today") {
              return (
                itemDay === actualDay &&
                itemMonth === actualMonth &&
                itemYear === actualYear && (
                  <TransactionItem
                    id={item.id}
                    key={item.id}
                    payer={item.payer}
                    receiver={item.receiver}
                    value={item.value}
                    date={datetime}
                    transaction_type={item.transaction_type}
                  />
                )
              );
            }
            if (transactionType === "lastWeek") {
              return (
                Number(itemDay) >= Number(actualDay) - 7 &&
                Number(itemDay) <= Number(actualDay) &&
                itemMonth === actualMonth &&
                itemYear === actualYear && (
                  <TransactionItem
                    id={item.id}
                    key={item.id}
                    payer={item.payer}
                    receiver={item.receiver}
                    value={item.value}
                    date={datetime}
                    transaction_type={item.transaction_type}
                  />
                )
              );
            }
            if (transactionType === "lastMonth") {
              return (
                (Number(itemMonth) === Number(actualMonth) ||
                  Number(itemMonth) === Number(actualMonth) - 1) &&
                itemYear === actualYear && (
                  <TransactionItem
                    id={item.id}
                    key={item.id}
                    payer={item.payer}
                    receiver={item.receiver}
                    value={item.value}
                    date={datetime}
                    transaction_type={item.transaction_type}
                  />
                )
              );
            }
            return (
              <TransactionItem
                id={item.id}
                key={item.id}
                payer={item.payer}
                receiver={item.receiver}
                value={item.value}
                date={datetime}
                transaction_type={item.transaction_type}
              />
            );
          })}
        </TransactionsBox>
      </InfoBox>
    </BackgroundBox>
  );
};

export default Transacoes;
