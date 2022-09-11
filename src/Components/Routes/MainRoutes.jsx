import React from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Login/Register";
import AuthRoutes from "./AuthRoutes";
import { Navbar } from "../Navbar/Navbar";

const MainRoutes = () => {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/"
          element={
            <AuthRoutes>
              <Home />
            </AuthRoutes>
          }
        />
      </Routes>
    </div>
  );
};

export default MainRoutes;
