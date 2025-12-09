import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import router from "./routes/router.jsx";
import { GlobalContextProvider } from "./context/GlobalContext.jsx";
import "./index.css";
import { GoogleOAuthProvider } from '@react-oauth/google';

createRoot(document.getElementById("root")).render(
  <GlobalContextProvider>
    <RouterProvider router={router} ></RouterProvider>
  </GlobalContextProvider>,
  <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID_HERE">
    <main />
  </GoogleOAuthProvider>
);