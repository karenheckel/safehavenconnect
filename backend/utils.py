import requests
import os
import random

PEXELS_API_KEY = os.environ.get("PEXELS_API_KEY")
PEXELS_URL = "https://api.pexels.com/v1/search"

def get_image_for_topic(query, fallback=None):
    if not PEXELS_API_KEY:
        return fallback

    try:
        response = requests.get(
            PEXELS_URL,
            headers={"Authorization": PEXELS_API_KEY},
            params={"query": query, "per_page": 10}
        )
        if response.status_code == 200:
            data = response.json()
            photos = data.get("photos", [])
            if photos:
                return random.choice(photos)["src"]["medium"]
    except Exception as e:
        print("Pexels fetch error:", e)

    return fallback
