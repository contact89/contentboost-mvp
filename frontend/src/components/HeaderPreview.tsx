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
};
