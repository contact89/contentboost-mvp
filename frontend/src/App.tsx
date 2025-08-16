import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Header from "./components/Header";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { useAuth } from "./contexts/AuthContext";

const App: React.FC = () => {
  const { token } = useAuth();

  return (
    <div>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={!token ? <Login /> : <Navigate to="/dashboard" />} />
        <Route path="/dashboard" element={token ? <Dashboard /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  );
};

export default App;