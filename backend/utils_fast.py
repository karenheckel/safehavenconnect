import requests
import os
import random
from concurrent.futures import ThreadPoolExecutor, as_completed
from functools import lru_cache

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
    
    # Events - Common types
    "training": ["workshop", "educational training", "skill development"],
    "meal service": ["community meal", "food service", "food bank"],
    "orientation": ["group meeting", "welcome event", "new member orientation"],
    "community health awareness": ["health awareness", "community health", "wellness event"],
    "workshop": ["training session", "educational workshop", "learning event"],
    "wellness": ["wellness event", "health fair", "fitness class"],
    "outreach": ["community outreach", "public event", "community engagement"],
    "health fair": ["health screening", "medical fair", "health event"],
    "mentoring": ["mentorship", "youth mentoring", "guidance"],
    "veterans": ["veterans support", "veteran services", "military support"],
    "youth": ["youth program", "teen event", "young people"],
    "job training": ["job training", "employment", "career training"],
    "health screening": ["medical screening", "health check", "wellness screening"],
    "support group": ["support group", "peer support", "community support"],
    "class": ["educational class", "training class", "learning class"],
    "seminar": ["seminar", "educational seminar", "professional development"],
}

# Cache for API responses to avoid redundant calls
_image_cache = {}

# Reusable session for connection pooling
_session = requests.Session()

@lru_cache(maxsize=256)
def _get_search_query(query_lower):
    """Get the best search query for a topic (cached)."""
    for topic_key, alternatives in TOPIC_MAPPINGS.items():
        if topic_key.lower() in query_lower:
            return random.choice(alternatives)
    return None

def _fetch_images_batch(search_query, cache_key=None):
    """Fetch a batch of images for a search query."""
    if cache_key and cache_key in _image_cache:
        return _image_cache[cache_key]
    
    if not PEXELS_API_KEY:
        return []
    
    try:
        response = _session.get(
            PEXELS_URL,
            headers={"Authorization": PEXELS_API_KEY},
            params={"query": search_query, "per_page": 80},
            timeout=10
        )
        if response.status_code == 200:
            data = response.json()
            photos = data.get("photos", [])
            if cache_key:
                _image_cache[cache_key] = photos
            return photos
        else:
            print(f"Pexels API error for '{search_query}': {response.status_code} - {response.text[:100]}")
    except Exception as e:
        print(f"Pexels fetch error for '{search_query}': {e}")
        import traceback
        traceback.print_exc()
    
    return []

def get_image_for_topic(query, fallback=None):
    """Get a single image URL for a topic (optimized version)."""
    if not PEXELS_API_KEY:
        return fallback
    
    query_lower = query.lower()
    search_query = _get_search_query(query_lower) or query
    
    # Use the search query as cache key to batch similar requests
    cache_key = search_query
    photos = _fetch_images_batch(search_query, cache_key)
    
    if photos:
        return random.choice(photos)["src"]["medium"]
    
    return fallback

def get_images_batch(queries, fallback_url=None, max_workers=5):
    """
    Fetch images for multiple items in parallel.
    
    Args:
        queries: List of query strings or tuples of (query, cache_key)
        fallback_url: Fallback URL if image fetch fails
        max_workers: Number of concurrent threads
    
    Returns:
        List of image URLs in the same order as input queries
    """
    if not PEXELS_API_KEY:
        return [fallback_url] * len(queries)
    
    results = [None] * len(queries)
    
    def fetch_and_store(index, query_data):
        if isinstance(query_data, tuple):
            query, cache_key = query_data
        else:
            query = query_data
            cache_key = query
        
        query_lower = query.lower()
        search_query = _get_search_query(query_lower) or query
        photos = _fetch_images_batch(search_query, search_query)
        
        if photos:
            # Use index to distribute photos for diversity
            photo_idx = index % len(photos)
            url = photos[photo_idx]["src"]["medium"]
            results[index] = url
        else:
            results[index] = fallback_url
    
    # Use ThreadPoolExecutor for parallel fetching
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        futures = {
            executor.submit(fetch_and_store, i, query): i 
            for i, query in enumerate(queries)
        }
        for future in as_completed(futures):
            try:
                future.result()
            except Exception as e:
                print(f"Error fetching image: {e}")
    
    return results

def get_images_batch_cached(items_with_queries, fallback_url=None, max_workers=5):
    """
    Fetch images for multiple items, reusing cached results.
    
    Args:
        items_with_queries: List of (item_id, query) tuples
        fallback_url: Fallback URL if image fetch fails
        max_workers: Number of concurrent threads
    
    Returns:
        Dict mapping item_id to image URL
    """
    if not PEXELS_API_KEY:
        return {item_id: fallback_url for item_id, _ in items_with_queries}
    
    results = {}
    
    # Group queries to reuse cached results
    query_to_indices = {}
    for idx, (item_id, query) in enumerate(items_with_queries):
        query_lower = query.lower()
        search_query = _get_search_query(query_lower) or query
        if search_query not in query_to_indices:
            query_to_indices[search_query] = []
        query_to_indices[search_query].append((idx, item_id))
    
    def fetch_for_query(search_query):
        return _fetch_images_batch(search_query, search_query)
    
    # Fetch unique queries in parallel - map future to search_query
    future_to_query = {}
    with ThreadPoolExecutor(max_workers=max_workers) as executor:
        for sq in query_to_indices.keys():
            future = executor.submit(fetch_for_query, sq)
            future_to_query[future] = sq
        
        for future in as_completed(future_to_query.keys()):
            try:
                search_query = future_to_query[future]
                photos = future.result()
                
                # Assign images to all items with this query
                # Distribute photos across items to maximize diversity
                num_items = len(query_to_indices[search_query])
                
                if photos:
                    # Create a list of photo indices, shuffled for diversity
                    photo_indices = list(range(len(photos)))
                    random.shuffle(photo_indices)
                    
                    for position, (idx, item_id) in enumerate(query_to_indices[search_query]):
                        # Cycle through photos to distribute them
                        photo_idx = photo_indices[position % len(photo_indices)]
                        results[item_id] = photos[photo_idx]["src"]["medium"]
                else:
                    for idx, item_id in query_to_indices[search_query]:
                        results[item_id] = fallback_url
            except Exception as e:
                print(f"Error fetching images: {e}")
                import traceback
                traceback.print_exc()
    
    return results
