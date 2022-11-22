import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import AccountContext from "../store/account-context";
import { toast } from "react-toastify";

import { postLogin } from "../server/server";

import { Box, Typography } from "@mui/material";
import CssButton from "../components/styled/CssButton";
import CssInput from "../components/styled/CssInput";
import StyledTitle from "../components/styled/StyledTitle";
import StyledInputLabel from "../components/styled/StyledInputLabel";
import StyledFormControl from "../components/styled/StyledFormControl";
import Header from "../components/Header";

import { styled } from "@mui/material/styles";
import landing from "../assets/banner-login.png";

const BackgroundImageBox = styled(Box)(() => ({
  backgroundImage: `url(${landing})`,
  width: "100vw",
  maxWidth: "100vw",
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: "0",
}));

const CenterBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
}));

const ContentBox = styled(Box)(() => ({
  padding: "2rem",
  marginLeft: "3rem",
  maxWidth: "60%",
}));

const ContentTitle = styled(Typography)(() => ({
  color: "white",
  fontFamily: "IBM Plex Sans",
  fontSize: "3rem",
  fontWeight: "bold",
}));

const ContentSubtitle = styled(Typography)(() => ({
  color: "white",
  fontFamily: "IBM Plex Sans",
  fontSize: "1.5rem",
}));

const FormBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  padding: "2rem",
}));

const Login = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const accountCtx = useContext(AccountContext);

  const handleLogin = async () => {
    try {
      const { data } = await postLogin({ username, password });
      localStorage.setItem("@auth", JSON.stringify(data.accessToken));
      console.log(data.user);
      accountCtx.addUser(data.user);
      navigate("/painel");
    } catch (err: any) {
      toast.error(err.response.data.message || "Dados invalidos");
      console.log(err);
    }
  };

  return (
    <BackgroundImageBox>
      <Header />

      <CenterBox>
        <ContentBox>
          <ContentTitle>
            RESPONSABILIDADE E AUTONOMIA PARA ALCANÇAR O INFINITO E ALÉM
          </ContentTitle>
          <ContentSubtitle>
            Uma carteira digital com diversas vantagens pensadas em você.
          </ContentSubtitle>
        </ContentBox>

        <FormBox>
          <StyledTitle
            sx={{
              fontFamily: "IBM Plex Sans",
              fontWeight: "bold",
              fontSize: "32px",
              color: "white",
            }}
          >
            Login
          </StyledTitle>

          <StyledFormControl variant="standard">
            <StyledInputLabel shrink htmlFor="username-c">
              Username
            </StyledInputLabel>
            <CssInput
              value={username}
              onChange={(e) => setUserName(e.target.value)}
              id="username-c"
            />
          </StyledFormControl>

          <StyledFormControl variant="standard">
            <StyledInputLabel shrink htmlFor="password-c">
              Password
            </StyledInputLabel>
            <CssInput
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              id="password-c"
            />
          </StyledFormControl>

          <CssButton onClick={handleLogin} variant="contained" disableRipple>
            Entrar
          </CssButton>
        </FormBox>
      </CenterBox>
    </BackgroundImageBox>
  );
};

export default Login;
