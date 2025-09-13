import { StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import { ToastProvider, type Position } from "react-floatify";

function Root() {
  const [position, setPosition] = useState<Position>("bottom right");

  return (
    <StrictMode>
      <ToastProvider position={position}>
        <App position={position} setPosition={setPosition} />
      </ToastProvider>
    </StrictMode>
  );
}

createRoot(document.getElementById("root")!).render(<Root />);
