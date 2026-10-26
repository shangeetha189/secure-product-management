import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";

import Login from "./Pages/Login/Login";
import Register from "./Pages/Register/Register";
import Dashboard from "./Pages/Dashboard/Dashboard";
import Products from "./Pages/Products/Products";
import About from "./Pages/About/About";
import Contact from "./Pages/Contact/Contact";


// ================= PROTECTED PAGE =================

function ProtectedPage({ children }) {

  const token = localStorage.getItem("token");

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}


// ================= APP =================

function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* ================= PUBLIC PAGES ================= */}

        <Route
          path="/"
          element={<Navigate to="/login" replace />}
        />

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* ================= PROTECTED PAGES ================= */}

        <Route
          path="/dashboard"
          element={
            <ProtectedPage>
              <Dashboard />
            </ProtectedPage>
          }
        />

        <Route
          path="/products"
          element={
            <ProtectedPage>
              <Products />
            </ProtectedPage>
          }
        />

        <Route
          path="/about"
          element={
            <ProtectedPage>
              <About />
            </ProtectedPage>
          }
        />

        <Route
          path="/contact"
          element={
            <ProtectedPage>
              <Contact />
            </ProtectedPage>
          }
        />


        {/* ================= INVALID URL ================= */}

        <Route
          path="*"
          element={<Navigate to="/login" replace />}
        />

      </Routes>

    </BrowserRouter>
  );
}

export default App;