import os
import requests
from flask import Flask
from models import db, Resource
from config import Config

# Flask app setup (to use SQLAlchemy outside app context)
app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)

# RapidAPI setup
API_URL = "https://homeless-shelter.p.rapidapi.com/zipcode"
HEADERS = {
    "x-rapidapi-host": "homeless-shelter.p.rapidapi.com",
    "x-rapidapi-key": os.getenv("RAPIDAPI_KEY") or "9d80279d88msh249473dcbd9a85bp1312f0jsn9eab5d8b0fe6"
}

# Texas ZIP codes (representative list — you can expand this later)
ZIP_CODES = [
    "78701", "75201", "75226", "78207", "78704", "77002", "77003", 
]

def fetch_shelters_for_zip(zipcode):
    """Fetch shelter data for a specific ZIP code."""
    try:
        response = requests.get(API_URL, headers=HEADERS, params={"zipcode": zipcode}, timeout=10)
        response.raise_for_status()
        return response.json()
    except Exception as e:
        print(f"[ERROR] Failed fetching ZIP {zipcode}: {e}")
        return []


def save_shelters_to_db(shelters_data):
    """Save shelter data to the Resource table with category='shelter'."""
    added_count = 0

    for item in shelters_data:
        name = item.get("name") or "Unnamed Shelter"
        address = item.get("address") or ""
        city = item.get("city") or ""
        state = item.get("state") or ""
        zip_code = item.get("zip") or ""
        phone = item.get("phone")
        website = item.get("website")

        # Check for duplicates by name + zipcode
        existing = Resource.query.filter_by(title=name, location=zip_code).first()
        if existing:
            continue

        description_text = f"Shelter located at {address}, {city}, {state} {zip_code}"
        if phone:
            description_text += f". Phone: {phone}"

        new_resource = Resource(
            title=name,
            organization_name=name,
            description=description_text,
            location=f"{address}, {city}, {state} {zip_code}",
            topic="homeless shelter",
            resource_url=website,
            category="shelter"
        )

        db.session.add(new_resource)
        added_count += 1

    db.session.commit()
    print(f"[INFO] Added {added_count} new shelters.")


def main():
    with app.app_context():
        for zipcode in ZIP_CODES:
            print(f"Fetching shelters for ZIP: {zipcode}")
            data = fetch_shelters_for_zip(zipcode)
            if data:
                save_shelters_to_db(data)
            else:
                print(f"[WARN] No data for {zipcode}")


if __name__ == "__main__":
    main()