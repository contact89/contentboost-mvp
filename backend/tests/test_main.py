# backend/tests/test_main.py
import sys
import os
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app  # ✅ fonctionne si ton main.py est dans app/
from httpx import AsyncClient
from httpx import ASGITransport   # ✅ il manquait ça
import pytest


@pytest.mark.asyncio
async def test_root():
    transport = ASGITransport(app=app)
    async with AsyncClient(transport=transport, base_url="http://test") as ac:
        response = await ac.get("/")
    assert response.status_code == 200
    assert response.json() == {"message": "API ContentBoost is running"}  # ✅ corrigé