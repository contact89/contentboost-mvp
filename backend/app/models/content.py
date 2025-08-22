# app/models/content.py
from pydantic import BaseModel
from typing import Optional, List
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

class ContentItem(BaseModel):
    username: str
    content: str
    image_url: Optional[str] = None

# Stockage en mémoire
contents_storage: List[ContentItem] = []
