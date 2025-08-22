// src/components/Header.tsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header: React.FC = () => {
  const { token, logout } = useAuth(); // ✅ utiliser logout au lieu de setToken
  const navigate = useNavigate();

  const handleLogout = () => {
    logout(); // ⚡ appel du contexte
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        ContentBoost
      </Link>

      <nav className="flex items-center gap-4">
        {token ? (
          <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <button
              onClick={handleLogout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
            >
              Déconnexion
            </button>
          </>
        ) : (
          <Link to="/login" className="hover:underline">
            Connexion
          </Link>
        )}
      </nav>
    </header>
  );
};

export default Header;