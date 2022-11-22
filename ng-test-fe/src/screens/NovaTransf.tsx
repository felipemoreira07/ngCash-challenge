import { useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useToken from "../hooks/useToken";
import AccountContext from "../store/account-context";
import { postTransaction } from "../server/server";

import { Box, InputLabel, TextField } from "@mui/material";
import SubMenu from "../components/SubMenu";
import BackgroundBox from "../components/styled/BackgroundBox";
import StyledFormControl from "../components/styled/StyledFormControl";
import CssButton from "../components/styled/CssButton";

import { styled } from "@mui/material/styles";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import PersonIcon from "@mui/icons-material/Person";

const CssInput = styled(TextField)(({ theme }) => ({
  marginTop: theme.spacing(3),
  borderRadius: 4,
  background: "white",
  fontSize: 20,
  paddingTop: "1.5rem",
  fontFamily: "IBM Plex Sans",
}));

const TransactionsBox = styled(Box)(() => ({
  width: "80%",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  paddingTop: "2rem",
}));

const StyledInputLabel = styled(InputLabel)(() => ({
  color: "black",
  fontFamily: "IBM Plex Sans",
  fontSize: "24px",
}));

const StyledUsernameInputBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-end",
  gap: "5px",
}));

const StyledValueInputBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "flex-end",
}));

const StyledPersonIcon = styled(PersonIcon)(() => ({
  marginBottom: "5px",
}));

const StyledAttachMoneyIcon = styled(AttachMoneyIcon)(() => ({
  marginBottom: "5px",
}));

const NovaTransf = () => {
  const transactionCtx = useContext(AccountContext);
  const navigate = useNavigate();
  const token = useToken();

  const payer = transactionCtx.user.username;
  const payerBalance = transactionCtx.balance;
  const receiverInputRef = useRef<HTMLInputElement>(null);
  const valueInputRef = useRef<HTMLInputElement>(null);

  const buttonHandler = async () => {
    const receiver = receiverInputRef.current?.value;
    const value = valueInputRef.current?.value;

    if (receiver && value) {
      try {
        await postTransaction(token, {
          creditedUsername: receiver,
          debitedUsername: payer,
          debitedUserBalance: payerBalance,
          transactionValue: value,
        });
        navigate("/login");
      } catch (err) {
        console.log(err);
      }
    }

    navigate("/painel");
  };

  return (
    <BackgroundBox>
      <SubMenu />
      <TransactionsBox>
        <StyledFormControl variant="standard">
          <StyledInputLabel shrink htmlFor="username-c">
            transferir <strong>para quem</strong>
          </StyledInputLabel>
          <StyledUsernameInputBox>
            <StyledPersonIcon />
            <CssInput
              inputRef={receiverInputRef}
              variant="standard"
              id="username-nt"
              placeholder="username"
            />
          </StyledUsernameInputBox>
        </StyledFormControl>

        <StyledFormControl variant="standard">
          <StyledInputLabel shrink htmlFor="password-c">
            transferir <strong>quanto</strong>
          </StyledInputLabel>
          <StyledValueInputBox>
            <StyledAttachMoneyIcon />
            <CssInput
              inputRef={valueInputRef}
              variant="standard"
              id="value-nt"
              placeholder="10.00"
            />
          </StyledValueInputBox>
        </StyledFormControl>

        <CssButton
          onClick={buttonHandler}
          variant="contained"
          disableRipple
          sx={{ marginTop: "3rem" }}
        >
          Transferir
        </CssButton>
      </TransactionsBox>
    </BackgroundBox>
  );
};

export default NovaTransf;
