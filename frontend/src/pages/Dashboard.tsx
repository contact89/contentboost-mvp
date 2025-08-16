import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { generateContent } from "../services/api";
import GenerateForm from "../components/GenerateForm";
import ContentDisplay from "../components/ContentDisplay";

const Dashboard: React.FC = () => {
  const { token } = useAuth();
  const [result, setResult] = useState<{ content: string; image_url?: string } | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGenerate = async (fields: { [key: string]: string }) => {
    if (!token) return;
    setLoading(true);
    setError("");
    try {
      const data = await generateContent(token, "article", fields, false);
      setResult(data);
    } catch (err: any) {
      setError(err.message || "Erreur lors de la génération");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-3xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

      {error && <p className="text-red-500 mb-4">{error}</p>}

      <GenerateForm onGenerate={handleGenerate} />

      {loading && <p className="mb-4">Génération en cours...</p>}

      {result && <ContentDisplay content={result.content} image_url={result.image_url} />}
    </div>
  );
};

export default Dashboard;