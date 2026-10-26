import React from "react";
import { Navigate, Outlet } from "react-router-dom";

function ProtectedRoutes() {

  console.log("PROTECTED ROUTE RUNNING");

  const token = localStorage.getItem("token");

  console.log("TOKEN:", token);

  if (token === null) {
    console.log("NO TOKEN → GOING TO LOGIN");
    return <Navigate to="/login" replace />;
  }

  console.log("TOKEN FOUND → ALLOWING PAGE");

  return <Outlet />;
}

export default ProtectedRoutes;