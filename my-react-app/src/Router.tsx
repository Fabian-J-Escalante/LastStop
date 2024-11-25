import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/home";
import Ruta from "./pages/route";
import Agency from "./pages/agency";
import Map from "./pages/map";
import Login from "./pages/login";
import ProtectedRoute from "./components/ProtectedRoute";

export const AppRouter: React.FC<{}> = () => {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/rutas"
        element={
          <ProtectedRoute>
            <Ruta />
          </ProtectedRoute>
        }
      />
      <Route
        path="/agencias"
        element={
          <ProtectedRoute>
            <Agency />
          </ProtectedRoute>
        }
      />
      <Route
        path="/mapa"
        element={
          <ProtectedRoute>
            <Map />
          </ProtectedRoute>
        }
      />
      <Route path="/" element={<Home />} />
    </Routes>
  );
};