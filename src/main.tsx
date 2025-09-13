import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ToastProvider } from "react-floatify";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ToastProvider position="bottom right">
      <App />
    </ToastProvider>
  </StrictMode>
);
