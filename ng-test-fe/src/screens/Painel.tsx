import { useNavigate } from "react-router-dom";
import { useEffect, useContext, useState } from "react";
import AccountContext from "../store/account-context";
import useToken from "../hooks/useToken";
import { getUserByUsername, getTransactions } from "../server/server";

import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableContainer,
  TableRow,
  tableCellClasses,
  Paper,
  Typography,
} from "@mui/material";
import SubMenu from "../components/SubMenu";
import BackgroundBox from "../components/styled/BackgroundBox";
import InfoBox from "../components/styled/InfoBox";

import { styled } from "@mui/material/styles";

const CssButton = styled(Button)({
  height: "40%",
  marginTop: "3rem",
  textTransform: "none",
  fontSize: 20,
  backgroundColor: "blue",
  borderColor: "#0063cc",
  fontFamily: "IBM Plex Sans",
  "&:hover": {
    backgroundColor: "#0069d9",
    borderColor: "#0062cc",
    boxShadow: "none",
  },
  "&:active": {
    boxShadow: "none",
    backgroundColor: "#0062cc",
    borderColor: "#005cbf",
  },
});

const StyledTableTitle = styled(Typography)(() => ({
  paddingLeft: "1rem",
  paddingTop: "1rem",
  background: "black",
  color: "white",
  fontFamilyF: "IBM Plex Sans",
  fontWeight: "bold",
  fontSize: "28px",
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
    fontSize: "1.25rem",
    fontFamily: "IBM Plex Sans",
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: "1.125rem",
    fontWeight: 500,
    fontFamily: "IBM Plex Sans",
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  "&:nth-of-type(odd)": {
    backgroundColor: theme.palette.action.hover,
  },
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const BottomBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  gap: "5rem",
}));

const BalanceBox = styled(Box)(() => ({
  padding: "3rem",
}));

const BalanceTitle = styled(Typography)(() => ({
  fontFamily: "IBM Plex Sans",
  fontWeight: "medium",
  fontSize: "28px",
}));

const Balance = styled(Typography)(() => ({
  fontFamily: "IBM Plex Sans",
  fontSize: "20px",
}));

const tableColumns = ["ID", "Data", "Valor", "Pagador", "Receptor"];

const Painel = () => {
  const navigate = useNavigate();
  const token = useToken();
  const accountCtx = useContext(AccountContext);

  const [balance, setBalance] = useState("");
  const [transacoes, setTransacoes] = useState<[] | null>(null);

  useEffect(() => {
    const fetchBalance = async () => {
      const { data } = await getUserByUsername(token, accountCtx.user.username);
      setBalance(data.account.balance);
    };

    const fetchTransactions = async () => {
      const { data } = await getTransactions(token, accountCtx.user.accountId);
      setTransacoes(data);
    };

    fetchBalance();
    fetchTransactions();
  }, [accountCtx, token]);

  const userBalanceNumber = Number(balance);

  return (
    <BackgroundBox>
      <SubMenu />
      <InfoBox>
        <TableContainer
          component={Paper}
          sx={{ width: "50vw", marginTop: "3rem" }}
        >
          <StyledTableTitle>Últimas Transações</StyledTableTitle>
          <Table aria-label="customized table">
            <TableHead>
              <TableRow>
                {tableColumns.map((tableColumn) => (
                  <StyledTableCell align="center">
                    {tableColumn}
                  </StyledTableCell>
                ))}
              </TableRow>
            </TableHead>
            <TableBody>
              {transacoes &&
                transacoes.map((row: any) => {
                  const day = row.date.slice(8, 10);
                  const month = row.date.slice(5, 7);
                  const year = row.date.slice(0, 4);
                  const datetime = `${day}/${month}/${year}`;
                  return (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {row.id}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {datetime}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {Number(row.value).toFixed(2)}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.payer}
                      </StyledTableCell>
                      <StyledTableCell align="center">
                        {row.receiver}
                      </StyledTableCell>
                    </StyledTableRow>
                  );
                })}
            </TableBody>
          </Table>
        </TableContainer>

        <BottomBox>
          <BalanceBox>
            <BalanceTitle>Balance Atual</BalanceTitle>
            <Balance>R${userBalanceNumber.toFixed(2)}</Balance>
          </BalanceBox>

          <CssButton
            variant="contained"
            disableRipple
            onClick={() => navigate("/nova-transferencia")}
          >
            Nova Transferência
          </CssButton>
        </BottomBox>
      </InfoBox>
    </BackgroundBox>
  );
};

export default Painel;
