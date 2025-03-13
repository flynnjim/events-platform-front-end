import React from "react";

import App from "./App.tsx";

import { BrowserRouter } from "react-router-dom";

import { createRoot } from "react-dom/client";

import "./index.css";

const rootElement = document.getElementById("root") as HTMLElement | null;

if (rootElement) {
  createRoot(rootElement).render(
    <React.StrictMode>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </React.StrictMode>
  );
} else {
  console.error("Root element not found");
}
