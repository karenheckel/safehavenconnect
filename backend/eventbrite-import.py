"""
eventbrite_imports.py
---------------------
Fetches events from Eventbrite related to helping victims of domestic abuse
and similar causes (e.g., violence prevention, survivor support, etc.).
"""

import requests
import json
import time

# Replace with your real Eventbrite personal OAuth token
API_TOKEN = "MZ2VSNTBO4BYFEP54CWT"
BASE_URL = "https://www.eventbriteapi.com/v3/events/search"

# Topics to search for
TOPICS = [
    "domestic abuse",
    "domestic violence awareness",
    "sexual assault prevention",
    "violence prevention",
    "women's shelter",
    "abuse survivor support",
    "trauma recovery",
    "violence intervention",
    "victim advocacy",
    "safe housing",
    "survivor workshop"
]


def search_eventbrite(topic):
    """Search Eventbrite for events matching a given topic."""
    headers = {"Authorization": f"Bearer {API_TOKEN}"}
    params = {
        "q": topic,
        "sort_by": "date",
        "expand": "venue"
    }

    try:
        response = requests.get(BASE_URL, headers=headers, params=params)
        if response.status_code == 404:
            print(f"❌ 404: Endpoint not found for '{topic}' → {response.url}")
            return []
        response.raise_for_status()

        data = response.json()
        events = data.get("events", [])

        if not events:
            print(f"⚠️  No events found for '{topic}'.")
            return []

        print(f"\n✅ Found {len(events)} events for '{topic}':")
        for event in events:
            name = event["name"]["text"]
            url = event["url"]
            date = event["start"]["local"]
            print(f" - {name} ({date}) → {url}")

        return events

    except requests.exceptions.RequestException as e:
        print(f"❌ Request error for '{topic}': {e}")
        return []


def main():
    """Main function to search all topics and compile results."""
    all_events = []

    print("🔍 Starting Eventbrite import for domestic abuse–related events...\n")

    for topic in TOPICS:
        events = search_eventbrite(topic)
        all_events.extend(events)
        time.sleep(1)  # polite delay between requests

    # Save all events to a local JSON file
    with open("eventbrite_domestic_abuse_events.json", "w", encoding="utf-8") as f:
        json.dump(all_events, f, indent=2)

    print("\nDone importing domestic abuse–related events!")
    print(f"💾 Saved {len(all_events)} total events to 'eventbrite_domestic_abuse_events.json'.")


if __name__ == "__main__":
    main()
