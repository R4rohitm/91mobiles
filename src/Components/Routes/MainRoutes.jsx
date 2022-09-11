import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Home from "../Home/Home";
import { Login } from "../Login/Login";
import { Register } from "../Login/Register";
import AuthRoutes from "./AuthRoutes";
import { Navbar } from "../Navbar/Navbar";

const MainRoutes = () => {
  const [refreshNav, setRefreshNav] = useState(false);

  return (
    <div>
      <Navbar refreshNav={refreshNav} setRefreshNav={setRefreshNav} />
      <Routes>
        <Route path="/signup" element={<Register />} />
        <Route
          path="/login"
          element={
            <Login refreshNav={refreshNav} setRefreshNav={setRefreshNav} />
          }
        />
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
