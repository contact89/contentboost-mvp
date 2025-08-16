// src/components/LoginForm.tsx
import { useContext, useState } from "react";
import { AuthContext } from "../contexts/AuthContext";

const LoginForm = () => {
  const { login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
      alert("Connexion réussie 🚀");
    } catch {
      alert("Erreur de connexion ❌");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 space-y-4">
      <div>
        <label>Email</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <div>
        <label>Mot de passe</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded p-2 w-full"
        />
      </div>
      <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded">
        Connexion
      </button>
    </form>
  );
};

export default LoginForm;