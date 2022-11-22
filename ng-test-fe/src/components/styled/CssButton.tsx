import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";

const CssButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(3),
  boxShadow: "none",
  textTransform: "none",
  fontSize: 18,
  padding: "6px 12px",
  border: "1px solid",
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
}));

export default CssButton;
