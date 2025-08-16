import React from "react";

interface Props {
  content: string;
  image_url?: string;
}

const ContentDisplay: React.FC<Props> = ({ content, image_url }) => {
  return (
    <div className="bg-gray-100 p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">Contenu généré :</h2>
      <p className="mb-2">{content}</p>
      {image_url && <img src={image_url} alt="Generated" className="mt-2 max-w-full" />}
    </div>
  );
};

export default ContentDisplay;