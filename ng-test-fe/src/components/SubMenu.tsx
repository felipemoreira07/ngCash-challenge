import { useContext } from "react";
import { Link } from "react-router-dom";

import { styled } from "@mui/material/styles";
import { Box, Typography } from "@mui/material";

import logoImg from "../assets/logo-ngcash-branco.svg";
import AccountContext from "../store/account-context";

const SubMenuBox = styled(Box)(() => ({
  background: "#000",
  height: "100vh",
  width: "20%",
}));

const HeaderBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
}));

const Username = styled(Typography)(() => ({
  fontFamily: "IBM Plex Sans",
  fontWeight: "bold",
  color: "#fff",
  fontSize: "18px",
  marginTop: "1rem",
  paddingLeft: "3rem",
}));

const NavBox = styled(Box)(() => ({
  display: "flex",
  flexDirection: "column",
  gap: "1rem",
  padding: "2rem",
}));

const NavLink = styled(Link)(() => ({
  textDecoration: "none",
  fontFamily: "IBM Plex Sans",

  color: "#fff",
  fontSize: "22px",
}));

const navRoutes = [
  {
    name: "Painel",
    to: "/painel",
  },
  {
    name: "Transações",
    to: "/transacoes",
  },
  {
    name: "Nova Transferência",
    to: "/nova-transferencia",
  },
  {
    name: "Logout",
    to: "/",
  },
];

const SubMenu = () => {
  const accountCtx = useContext(AccountContext);

  return (
    <SubMenuBox>
      <HeaderBox>
        <img
          style={{
            zIndex: "1",
            width: "100px",
            height: "60px",
            marginLeft: "1rem",
            marginTop: "2rem",
          }}
          src={logoImg}
          alt="ng cash logo"
        />
        <Username>{accountCtx.user.username}</Username>
      </HeaderBox>

      <NavBox>
        {navRoutes.map((navRoute) => (
          <NavLink to={navRoute.to}>{navRoute.name}</NavLink>
        ))}
      </NavBox>
    </SubMenuBox>
  );
};

export default SubMenu;
