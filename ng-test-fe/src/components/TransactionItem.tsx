import { Box, Typography } from "@mui/material";

import { styled } from "@mui/material/styles";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

interface TransactionDTO {
  id: string;
  date: string;
  value: string | undefined;
  payer: string;
  receiver: string | undefined;
  transaction_type: string;
}

const TransactionItemBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  gap: "1rem",
  padding: "1rem",
}));

const ExchangeBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
}));

const Username = styled(Typography)(() => ({
  fontFamily: "IBM Plex Sans",
  fontWeight: "bold",
  fontSize: "18px",
}));

const Date = styled(Typography)(() => ({
  fontFamily: "IBM Plex Sans",
  fontSize: "18px",
}));

const Value = styled(Typography)(() => ({
  fontFamily: "IBM Plex Sans",
  fontWeight: "bold",
  fontSize: "18px",
}));

const TransactionItem = (props: TransactionDTO) => {
  return (
    <TransactionItemBox
      sx={{
        display: "flex",
        flexDirection: "row",
        alignItems: "center",
        gap: "1rem",
        padding: "1rem",
      }}
    >
      <ExchangeBox>
        <Username>{props.payer}</Username>
        <ArrowForwardIcon />
        <Username>{props.receiver}</Username>
      </ExchangeBox>

      <Date>{props.date}</Date>

      <Value color={props.transaction_type === "credited" ? "green" : "red"}>
        R${Number(props.value).toFixed(2)}
      </Value>
    </TransactionItemBox>
  );
};

export default TransactionItem;
