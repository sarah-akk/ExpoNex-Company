import React from "react";
import { createRoot } from "react-dom/client";
import App from "App";
import { AuthProvider } from "./context/AuthContext";

document.body.style.zoom = "100%";
const container = document.getElementById("app");
const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </React.StrictMode>
);
