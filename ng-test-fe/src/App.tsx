import NavRoutes from "./routes";
import AccountProvider from "./store/AccountProvider";

import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <AccountProvider>
      <ToastContainer />
      <NavRoutes />
    </AccountProvider>
  );
}

export default App;
