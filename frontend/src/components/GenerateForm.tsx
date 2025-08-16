// src/components/GenerateForm.tsx
import { useState } from "react";
import { generateContent } from "../services/api";
import ContentDisplay from "./ContentDisplay";

const GenerateForm = () => {
  const [topic, setTopic] = useState("");
  const [goal, setGoal] = useState("");
  const [tone, setTone] = useState("");
  const [result, setResult] = useState<any>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const data = await generateContent({
      template_id: "linkedin_post",
      fields: { topic, goal, tone },
      generate_image: true,
    });
    setResult(data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit} className="p-4 space-y-4 bg-white rounded shadow-md">
        <div>
          <label htmlFor="topic" className="block mb-2 text-sm font-medium text-gray-700">
            Topic
          </label>
          <input
            id="topic"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="goal" className="block mb-2 text-sm font-medium text-gray-700">
            Goal
          </label>
          <input
            id="goal"
            value={goal}
            onChange={(e) => setGoal(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <div>
          <label htmlFor="tone" className="block mb-2 text-sm font-medium text-gray-700">
            Tone
          </label>
          <input
            id="tone"
            value={tone}
            onChange={(e) => setTone(e.target.value)}
            className="border rounded p-2 w-full"
          />
        </div>

        <button
          type="submit"
          className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Générer
        </button>
      </form>

      {result && <ContentDisplay content={result.content} imageUrl={result.image_url} />}
    </div>
  );
};

export default GenerateForm;