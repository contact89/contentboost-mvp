// src/pages/Dashboard.tsx
import React, { useEffect, useState } from "react";
import { getContents } from "../services/api";

interface Content {
  content: string;
  image_url?: string | null;
}

const Dashboard: React.FC = () => {
  const [contents, setContents] = useState<Content[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchContents = async () => {
      try {
        const data = await getContents();
        setContents(data.contents || []);
      } catch (err: any) {
        setError(err.message || "Erreur lors du chargement des contenus");
      } finally {
        setLoading(false);
      }
    };

    fetchContents();
  }, []);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">📊 Mes contenus générés</h1>

      {loading && <p>Chargement en cours...</p>}
      {error && <p className="text-red-500">{error}</p>}

      {!loading && contents.length === 0 && (
        <p className="text-gray-500">Aucun contenu généré pour l’instant.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {contents.map((item, idx) => (
          <div
            key={idx}
            className="bg-white shadow rounded-lg p-4 flex flex-col"
          >
            <p className="text-gray-800 mb-4">{item.content}</p>
            {item.image_url && (
              <img
                src={item.image_url}
                alt="Generated"
                className="rounded-lg mt-auto max-h-60 object-cover"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;