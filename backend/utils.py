import requests
import os
import random

PEXELS_API_KEY = os.environ.get("PEXELS_API_KEY")
PEXELS_URL = "https://api.pexels.com/v1/search"

# Map topics/types to diverse search queries for better image variety
TOPIC_MAPPINGS = {
    # Organizations
    "shelter": ["homeless shelter", "emergency housing", "safe haven"],
    "health center": ["medical clinic", "healthcare facility", "doctor office"],
    "community service": ["community support", "social services", "community center"],
    "organization": ["nonprofit building", "community organization", "people helping"],
    "homeless support": ["shelter assistance", "housing help", "social support"],
    "shelter organization": ["emergency shelter", "housing support", "safe place"],
    
    # Resources
    "medical assistance": ["hospital", "medical care", "healthcare"],
    "medical services": ["doctor", "healthcare clinic", "medical examination"],
    "homelessness support": ["homeless services", "shelter resources", "housing assistance"],
    "mental health": ["counseling", "mental wellness", "therapy"],
    "women's shelter": ["women's support", "safe housing for women", "women's assistance"],
    "general shelter": ["emergency housing", "temporary shelter", "safe shelter"],
    
    # Events
    "training": ["workshop", "educational training", "skill development"],
    "meal service": ["community meal", "food service", "food bank"],
    "orientation": ["group meeting", "welcome event", "new member orientation"],
    "community health awareness": ["health awareness", "community health", "wellness event"],
    "workshop": ["training session", "educational workshop", "learning event"],
}

def get_image_for_topic(query, fallback=None):
    if not PEXELS_API_KEY:
        return fallback

    # Determine the best search query
    search_query = query
    query_lower = query.lower()
    
    # Check if we have a specific mapping for this topic
    for topic_key, alternatives in TOPIC_MAPPINGS.items():
        if topic_key.lower() in query_lower:
            # Pick a random alternative for diversity
            search_query = random.choice(alternatives)
            break

    try:
        response = requests.get(
            PEXELS_URL,
            headers={"Authorization": PEXELS_API_KEY},
            params={"query": search_query, "per_page": 50}
        )
        if response.status_code == 200:
            data = response.json()
            photos = data.get("photos", [])
            if photos:
                return random.choice(photos)["src"]["medium"]
    
    except Exception as e:
        print("Pexels fetch error:", e)

    return fallback
