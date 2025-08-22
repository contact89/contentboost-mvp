from fastapi import FastAPI, HTTPException, Depends, status
from fastapi.security import OAuth2PasswordRequestForm
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
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

# Stockage en mémoire des contenus générés
generated_contents = []  # List[dict] : {username, content, image_url}

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

    # Sauvegarde dans le stockage mémoire
    generated_contents.append({
        "username": current_user.username,
        "content": content,
        "image_url": image_url
    })

    return ContentResponse(content=content, image_url=image_url)

@app.get("/contents")
def get_contents(current_user: User = Depends(get_current_active_user)):
    """
    Retourne tous les contenus générés par l'utilisateur connecté.
    """
    user_contents = [
        item for item in generated_contents if item["username"] == current_user.username
    ]
    return {"contents": user_contents}

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