import React from "react";
import { Link } from "react-router-dom";

const Home: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Bienvenue sur ContentBoost 🚀</h1>
      <p className="mb-6 text-center max-w-md">
        Génère du contenu et des images automatiquement. Connecte-toi pour commencer !
      </p>
      <Link
        to="/login"
        className="px-6 py-3 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        Se connecter
      </Link>
    </div>
  );
};

export default Home;