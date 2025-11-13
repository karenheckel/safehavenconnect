import os
import requests
from app import create_app, db
from models import Organization, Resource

app = create_app()

def import_shelters():
    api_key = os.getenv("RAPIDAPI_KEY", "742ce9e20amsh8b8e1ea6fcec11ap1a85d5jsnc4b97d8ca925")
    headers = {
        "x-rapidapi-host": "homeless-shelter.p.rapidapi.com",
        "x-rapidapi-key": api_key
    }

    zipcodes = [
        {"zipcode": "78701", "city": "Austin"},    # Austin, TX
        {"zipcode": "77001", "city": "Houston"},   # Houston, TX
        {"zipcode": "75201", "city": "Dallas"}     # Dallas, TX
    ]

    for location in zipcodes:
        print(f"Fetching shelters for zipcode {location['zipcode']} ({location['city']})...")
        url = f"https://homeless-shelter.p.rapidapi.com/zipcode?zipcode={location['zipcode']}"
        response = requests.get(url, headers=headers)

        try:
            data = response.json()
        except Exception as e:
            print("Error parsing JSON:", e)
            continue

        # DEBUG: show what the API actually returned
        if isinstance(data, dict):
            print("Response keys:", list(data.keys()))
            if "message" in data:
                print("Message from API:", data["message"])
        elif isinstance(data, list):
            print(f"Response contains a list with {len(data)} items.")
        else:
            print("Unexpected response format:", type(data))
            continue

        # Normalize the structure
        shelters = []
        if isinstance(data, list):
            shelters = data
        elif isinstance(data, dict):
            # try common keys used in APIs
            for key in ["shelters", "results", "data"]:
                if key in data and isinstance(data[key], list):
                    shelters = data[key]
                    break
        else:
            continue

        if not shelters:
            print(f"No shelters found for {location['city']} (zipcode {location['zipcode']}), skipping.")
            continue

        # Now process each shelter
        for item in shelters:
            if not isinstance(item, dict):
                print(f"Skipping unexpected item: {item}")
                continue

            name = item.get("name")
            address = item.get("address")
            phone = item.get("phone")
            website = item.get("website")
            city_name = item.get("city")
            state = item.get("state")

            if not name:
                continue

            # Avoid duplicates
            organization = Organization.query.filter_by(name=name).first()
            if not organization:
                organization = Organization(
                    name=name,
                    location=f"{city_name}, {state}",
                    organization_type="Shelter Organization",
                    website_url=website,
                    description=f"{name} provides shelter and support services in {city_name}.",
                    map_url=f"{city_name}, {state}"
                )
                db.session.add(organization)

            resource = Resource(
                title=name,
                organization_name=name,
                services="Emergency housing, counseling, food, and basic needs.",
                location=f"{address or 'Unknown'}, {city_name}, {state}",
                topic="Homelessness Support",
                category="Women's Shelter" if name and "women" in name.lower() else "General Shelter",
                resource_url=website,
                description=f"Shelter located in {city_name}, {state}. Contact: {phone or 'N/A'}",
                map_url=f"{address or 'Unknown'}, {city_name}, {state}"
            )

            resource.organizations.append(organization)
            db.session.add(resource)

        db.session.commit()
        print(f"Imported shelters for {location['city']}.")

    print("🎉 Done importing all shelters!")


if __name__ == "__main__":
    with app.app_context():
        import_shelters()
