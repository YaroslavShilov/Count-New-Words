// import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./components/App/App.tsx";

export const isLocalhost = window.location.hostname === "localhost";
console.info("Database: ", isLocalhost ? "Json Server" : "LocalStorage");

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <App />,
  // </StrictMode>,
);
