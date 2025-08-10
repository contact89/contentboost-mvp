import random

# Exemple de templates stockés en dur (plus tard ce sera JSON externes)
TEMPLATES = {
    "linkedin_post": [
        "Voici un post LinkedIn sur {subject} avec un ton {tone} qui vise à {goal}.",
        "Post inspirant : {subject}, ton {tone}, objectif : {goal}.",
        "Découvrez comment {subject} peut aider à {goal}, écrit sur un ton {tone}."
    ],
    "email_promotion": [
        "Bonjour, je vous présente {product} qui vous aidera à {goal}.",
        "Découvrez {product} : la solution parfaite pour {goal}."
    ]
}

def generate_content(template_id: str, fields: dict) -> str:
    if template_id not in TEMPLATES:
        raise ValueError(f"Template inconnu : {template_id}")
    
    template = random.choice(TEMPLATES[template_id])
    
    try:
        content = template.format(**fields)
    except KeyError as e:
        raise ValueError(f"Clé manquante dans les champs : {e}")
    
    return content
