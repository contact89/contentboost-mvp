import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Header: React.FC = () => {
  const { token, setToken } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    setToken(null);
    navigate("/login");
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        ContentBoost
      </Link>
      {token && (
        <button
          onClick={handleLogout}
          className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition"
        >
          Déconnexion
        </button>
      )}
    </header>
  );
};

export default Header;