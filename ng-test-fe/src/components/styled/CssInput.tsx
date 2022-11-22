import { InputBase } from "@mui/material";

import { styled } from "@mui/material/styles";

const CssInput = styled(InputBase)(({ theme }) => ({
  marginTop: theme.spacing(3),
  borderRadius: 4,
  background: "white",
  border: "1px solid #ced4da",
  fontSize: 20,
  padding: "10px 12px",
  fontFamily: "IBM Plex Sans",
}));

export default CssInput;
