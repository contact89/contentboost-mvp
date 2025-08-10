from pydantic import BaseModel, Field
from typing import Optional, Dict

class ContentRequest(BaseModel):
    template_id: str = Field(..., description="Identifiant du template à utiliser")
    fields: Dict[str, str] = Field(..., description="Dictionnaire des champs à remplir pour le template")
    generate_image: Optional[bool] = Field(False, description="Si vrai, génère une image liée")

class ContentResponse(BaseModel):
    content: str = Field(..., description="Texte généré")
    image_url: Optional[str] = Field(None, description="URL de l'image générée, si applicable")
