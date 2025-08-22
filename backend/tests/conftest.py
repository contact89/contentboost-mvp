import pytest
from unittest.mock import MagicMock
import os , sys
sys.path.append(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))

from app.main import app  # ✅ fonctionne si ton main.py est dans app/

@pytest.fixture(autouse=True)
def mock_image_generator(monkeypatch):
    from app import models
    fake_generator = MagicMock()
    fake_generator.generate.return_value = "fake_image.png"
    monkeypatch.setattr(models.ia_image, "ImageGenerator", lambda: fake_generator)
