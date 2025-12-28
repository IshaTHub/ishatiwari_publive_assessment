import React from "react";
import { Routes, Route } from "react-router-dom";
import Navigation from "./components/Navigation";
import CRUDDashboard from "./components/CRUDDashboard";
import ElectionsList from "./components/ElectionsList";
import ElectionDetail from "./components/ElectionDetail";

const AppRoutes = () => {
  return (
    <>
      <Navigation />

      <Routes>
        <Route path="/" element={<CRUDDashboard />} />
        <Route path="/dashboard" element={<CRUDDashboard />} />
        <Route path="/elections" element={<ElectionsList />} />
        <Route path="/elections/:id" element={<ElectionDetail />} />
      </Routes>
    </>
  );
};

export default AppRoutes;
