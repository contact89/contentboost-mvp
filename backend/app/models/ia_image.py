# backend/app/models/ia_image.py

import os
import requests
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

class ImageGenerator:
    def __init__(self):
        self.api_key = os.getenv("HF_API_KEY")
        self.api_url = "https://api-inference.huggingface.co/models/stabilityai/stable-diffusion-2"  # modèle Stable Diffusion

        if not self.api_key:
            raise ValueError("HF_API_KEY non définie dans les variables d'environnement")
        # self.api_key = os.getenv("HF_API_KEY")
        # if not self.api_key:
        #     print("⚠️ Attention: HF_API_KEY non définie, le générateur d’image ne fonctionnera pas")

        self.headers = {
            "Authorization": f"Bearer {self.api_key}",
            "Accept": "application/json",
        }

    def generate_image(self, prompt: str) -> str:
        """
        Appelle l'API Hugging Face pour générer une image à partir d'un prompt.
        Retourne une URL temporaire ou une base64 image (selon l'API).
        """
        payload = {
            "inputs": prompt,
            "options": {"wait_for_model": True}
        }

        response = requests.post(self.api_url, headers=self.headers, json=payload)

        if response.status_code != 200:
            raise Exception(f"Erreur API Hugging Face: {response.status_code} {response.text}")

        # L'API retourne souvent l'image encodée en base64 dans le corps, ou une URL.  
        # Ici on suppose base64 (tu pourras adapter selon ce que renvoie l'API)

        # Exemple: {"generated_image": "<base64-string>"}
        # Pour simplifier, on va retourner une URL temporaire simulée

        # TODO: adapter selon réponse réelle
        print("[ia_image] Image générée avec succès pour le prompt:", prompt)

        # Pour tester on retourne une URL d'image statique (à remplacer)
        return "https://placekitten.com/400/300"
