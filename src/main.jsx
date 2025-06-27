import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { SampleState } from "./contexts/SampleState.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <SampleState>
      <App />
    </SampleState>
  </StrictMode>
);
