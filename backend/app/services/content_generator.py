import random

# Templates génériques
TEMPLATES = {
    "linkedin_post": [
        "Voici un post LinkedIn sur {subject} avec un ton {tone} qui vise à {goal}.",
        "Post inspirant : {subject}, ton {tone}, objectif : {goal}.",
        "Découvrez comment {subject} peut aider à {goal}, écrit sur un ton {tone}."
    ],
    "email_promotion": [
        "Bonjour, je vous présente {product} qui vous aidera à {goal}.",
        "Découvrez {product} : la solution parfaite pour {goal}."
    ],
    "article": [
        "Voici un article sur {topic} très intéressant.",
        "Découvrez tout ce que vous devez savoir sur {topic}.",
        "Un article complet sur {topic} pour vous informer."
    ]
}

def generate_content(template_id: str, fields: dict) -> str:
    """Génère du texte à partir d'un template et d'un dictionnaire de champs."""

    if template_id not in TEMPLATES:
        # Si le template n'existe pas, on prend un template par défaut
        template_id = random.choice(list(TEMPLATES.keys()))

    template_list = TEMPLATES[template_id]
    template = random.choice(template_list)

    # Remplace les champs du template
    try:
        content = template.format(**fields)
    except KeyError as e:
        # Si un champ est manquant, on le remplace par "[champ manquant]"
        missing_key = e.args[0]
        fields[missing_key] = f"[{missing_key} manquant]"
        content = template.format(**fields)

    return content
