import React from "react";
import { MemoryRouter } from "react-router-dom";
import Header from "./Header";
import { AuthProvider } from "../contexts/AuthContext";

// Composant pour voir le rendu du Header
export const HeaderPreview: React.FC = () => {
  return (
    <AuthProvider>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </AuthProvider>
  );
};aimport React from "react";
import { Link } from "react-router-dom";

interface HeaderPreviewProps {
  isLoggedIn?: boolean;
}

export const HeaderPreview: React.FC<HeaderPreviewProps> = ({ isLoggedIn }) => {
  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <Link to="/" className="font-bold text-xl">
        ContentBoost
      </Link>

      <nav className="flex items-center gap-4">
        {isLoggedIn ? (
          <>
            <Link to="/dashboard" className="hover:underline">
              Dashboard
            </Link>
            <button className="bg-red-500 px-3 py-1 rounded hover:bg-red-600 transition">
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

