import { styled } from "@mui/material/styles";

import {
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
  // hide last border
  "&:last-child td, &:last-child th": {
    border: 0,
  },
}));

const TransactionsTable = (transactions: any) => {
  const rows = transactions.map(function (trans: any) {
    if (trans) {
      return {
        id: trans.id,
        date: trans.date,
        value: trans.value,
        payer: trans.payer,
        receiver: trans.receiver,
      };
    }
    return {};
  });

  return (
    <TableContainer component={Paper} sx={{ width: "50vw", marginTop: "3rem" }}>
      <Typography
        sx={{
          paddingLeft: "0.5rem",
          paddingTop: "1rem",
          background: "black",
          color: "white",
          fontFamily: "IBM Plex Sans",
          fontWeight: "bold",
          fontSize: "28px",
        }}
      >
        Últimas Transações
      </Typography>
      <Table aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>ID</StyledTableCell>
            <StyledTableCell align="center">Data</StyledTableCell>
            <StyledTableCell align="center">Valor</StyledTableCell>
            <StyledTableCell align="center">Pagador</StyledTableCell>
            <StyledTableCell align="center">Receptor</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row: any) => (
            <StyledTableRow key={row.id}>
              <StyledTableCell component="th" scope="row">
                {row.id}
              </StyledTableCell>
              <StyledTableCell align="center">{row.createdAt}</StyledTableCell>
              <StyledTableCell align="center">{row.value}</StyledTableCell>
              <StyledTableCell align="center">
                {row.debitedAccount.username}
              </StyledTableCell>
              <StyledTableCell align="center">
                {row.creditedAccount.username}
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};

export default TransactionsTable;
