import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router";
import router from "./routes/router.jsx";
import AuthProvider from "./contexts/Authcontext.jsx";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { BillProvider } from "./contexts/BillContext.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BillProvider>
      <AuthProvider>
        <ToastContainer position="bottom-center" autoClose={3000} />
        <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
    </BillProvider>
  </StrictMode>
);
