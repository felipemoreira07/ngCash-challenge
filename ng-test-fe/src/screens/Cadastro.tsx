import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { postRegister } from "../server/server";
import { toast } from "react-toastify";

import { Box } from "@mui/material";
import CssInput from "../components/styled/CssInput";
import CssButton from "../components/styled/CssButton";
import StyledTitle from "../components/styled/StyledTitle";
import StyledInputLabel from "../components/styled/StyledInputLabel";
import StyledFormControl from "../components/styled/StyledFormControl";
import Header from "../components/Header";

import landing from "../assets/banner-landing.jpg";
import { styled } from "@mui/material/styles";

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
  flexDirection: "column",
}));

const Cadastro = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const buttonHandler = async () => {
    try {
      await postRegister({ username, password });
      navigate("/login");
    } catch (err: any) {
      toast.error(err.response.data.message || "Dados invalidos");
      console.log(err);
    }
  };

  return (
    <BackgroundImageBox>
      <Header />

      <CenterBox>
        <StyledTitle>Cadastro</StyledTitle>

        <StyledFormControl variant="standard">
          <StyledInputLabel shrink htmlFor="username-c">
            Username
          </StyledInputLabel>
          <CssInput
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setUsername(event.target.value)
            }
            id="username-c"
          />
        </StyledFormControl>

        <StyledFormControl variant="standard">
          <StyledInputLabel shrink htmlFor="password-c">
            Password
          </StyledInputLabel>
          <CssInput
            onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
              setPassword(event.target.value)
            }
            id="password-c"
          />
        </StyledFormControl>

        <CssButton onClick={buttonHandler} variant="contained" disableRipple>
          Entrar
        </CssButton>
      </CenterBox>
    </BackgroundImageBox>
  );
};

export default Cadastro;
