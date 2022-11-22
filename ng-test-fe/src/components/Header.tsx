import { Box, Link } from "@mui/material";

import { styled } from "@mui/material/styles";
import logoImg from "../assets/logo-ngcash-branco.svg";

const HeaderBox = styled(Box)(() => ({
  display: "flex",
  alignItems: "center",
  position: "absolute",
  top: "1.5rem",
  left: "1.5rem",
  gap: "3.5rem",
}));

const NavBox = styled(Box)(() => ({
  display: "flex",
  gap: "2rem",
}));

const NavLink = styled(Link)(() => ({
  color: "white",
  fontFamily: "IBM Plex Sans",
  fontSize: "16px",
  fontWeight: "bold",
}));

const navRoutes = [
  {
    name: "BENEFÍCIOS",
    link: "https://ng.cash/beneficios",
  },
  {
    name: "TARIFAS",
    link: "https://ng.cash/tarifas",
  },
  {
    name: "AJUDA",
    link: "https://help.ng.cash/pt-BR/",
  },
  {
    name: "SEGURANÇA",
    link: "https://ng.cash/seguranca",
  },
  {
    name: "CARREIRAS",
    link: "https://careers.ng.cash/",
  },
  {
    name: "PARCERIAS",
    link: "https://ng.cash/parcerias",
  },
];

const Header = () => {
  return (
    <HeaderBox>
      <img
        style={{ zIndex: "1", width: "130px", height: "50px" }}
        src={logoImg}
        alt="ng cash logo"
      />

      <NavBox>
        {navRoutes.map((navRoute) => (
          <NavLink target="_blank" href={navRoute.link} underline="hover">
            {navRoute.name}
          </NavLink>
        ))}
      </NavBox>
    </HeaderBox>
  );
};

export default Header;
