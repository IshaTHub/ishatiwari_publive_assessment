import React from "react";
import { BrowserRouter } from "react-router-dom";
import { ElectionProvider } from "./context/ElectionContext";
import AppRoutes from "./AppRoutes";

export default function App() {
  return (
    <ElectionProvider>
      <BrowserRouter>
        <AppRoutes />
      </BrowserRouter>
    </ElectionProvider>
  );
}
