from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
from app.schemas import ContentRequest, ContentResponse
from app.services.content_generator import generate_content
from app.models.ia_image import ImageGenerator
from dotenv import load_dotenv
import os

from app.auth import (
    authenticate_user,
    create_access_token,
    get_current_active_user,
    User,
    Token,
)

load_dotenv()

app = FastAPI()

image_generator = ImageGenerator()

@app.get("/")
async def read_root():
    return {"message": "API ContentBoost is running"}

@app.post("/generate", response_model=ContentResponse)
def generate(req: ContentRequest, current_user: User = Depends(get_current_active_user)):
    try:
        # Génération du contenu texte avec les bons attributs
        content = generate_content(req.template_id, req.fields)
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))

    image_url = None
    if req.generate_image:
        try:
            # Génération de l'image si demandé
            image_url = image_generator.generate_image(content)
        except Exception as e:
            raise HTTPException(status_code=500, detail=f"Erreur génération image: {e}")

    return ContentResponse(content=content, image_url=image_url)

@app.post("/token", response_model=Token)
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = authenticate_user(form_data.username, form_data.password)
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Identifiants incorrects",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token = create_access_token(data={"sub": user.username})
    return {"access_token": access_token, "token_type": "bearer"}

@app.get("/users/me", response_model=User)
async def read_users_me(current_user: User = Depends(get_current_active_user)):
    return current_user