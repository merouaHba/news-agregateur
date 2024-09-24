import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import AppRouter from "./routes/AppRouter.jsx";
import ThemeProvider from "./context/ThemeProvider.jsx";
import SearchProvider from "./context/SearchProvider.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import './index.css'
import UserProvider from './context/userprovider.jsx';



createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ToastContainer />

    <ThemeProvider>
      <SearchProvider>
      <UserProvider>
        <AppRouter />
      </UserProvider>
      </SearchProvider>
    </ThemeProvider>
  </StrictMode>
);
