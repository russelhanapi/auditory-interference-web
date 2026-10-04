import { createRoot } from "react-dom/client";
import { App } from "./App";
import { CONFIG } from "./config";
import { isPinConfigValid } from "./access";
import "@fontsource/hanken-grotesk/latin-400.css";
import "@fontsource/hanken-grotesk/latin-500.css";
import "./styles.css";

// Development only — clear authorization:
// localStorage.removeItem("auditory_interference_access");

if (localStorage.getItem("auditory_interference_access") === "granted") {
  window.location.replace(CONFIG.spotifyUrl);
} else {
  if (import.meta.env.DEV && !isPinConfigValid()) {
    console.warn("CONFIG.accessPin must contain exactly four digits.");
  }

  const rootElement = document.getElementById("root");
  if (rootElement) {
    createRoot(rootElement).render(<App />);
  }
}
