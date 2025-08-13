# backend/app/main.py

from fastapi import FastAPI, HTTPException
from app.schemas import ContentRequest, ContentResponse
from app.services.content_generator import generate_content
from app.models.ia_image import ImageGenerator
from dotenv import load_dotenv
load_dotenv()

app = FastAPI()

image_generator = ImageGenerator()

@app.post("/generate", response_model=ContentResponse)
def generate(req: ContentRequest):
    # Génération texte
    try:
        content = generate_content(req.template_type, req.data)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    # Génération image optionnelle
    image_url = None
    if req.generate_image:
        try:
            image_url = image_generator.generate_image(content)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Erreur génération image: {e}")

    return ContentResponse(content=content, image_url=image_url)
