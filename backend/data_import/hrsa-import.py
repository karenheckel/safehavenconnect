"""
Imports HRSA Health Center data and tags shelters (e.g., women's or domestic violence support).
"""

import os
import requests
from models import db, Resource, Organization, Event
from app import create_app
from datetime import datetime

HRSA_API_URL = "https://data.hrsa.gov/HDWAPI3_External/api/v1/GetHealthCentersByArea"
HRSA_TOKEN = os.getenv("HRSA_TOKEN", "440ab3e7-e7dc-49cb-9fb2-6548d5f0d22b")

STATE_FIPS_CODES = {
    "CA": "06", "TX": "48", "NY": "36", "FL": "12", "IL": "17"
}

# keywords that imply domestic violence or women's shelter services
WOMENS_KEYWORDS = ["women", "abuse", "domestic", "violence", "victim", "family support", "crisis"]

def generate_tags(name, description):
    """Generate tags based on text content."""
    text = f"{name} {description}".lower()
    if any(word in text for word in WOMENS_KEYWORDS):
        return "women's shelter, domestic violence support"
    return "health center, medical clinic, community service"

def import_hrsa_data():
    app = create_app()
    with app.app_context():
        shared_event = Event.query.filter_by(name="National Health Access Week").first()
        if not shared_event:
            shared_event = Event(
                name="National Health Access Week",
                location="United States",
                start_time=datetime(2025, 5, 1, 9, 0, 0),
                end_time=datetime(2025, 5, 7, 17, 0, 0),
                date=datetime(2025, 5, 1),
                event_type="Community Health Awareness",
                is_online=False,
                registration_open=True,
                description="A nationwide event promoting access to healthcare and resources.",
                event_url="https://www.hrsa.gov/",
                image_url="https://www.hrsa.gov/themes/custom/hrsa/images/hrsa-logo.png"
            )
            db.session.add(shared_event)
            db.session.commit()

        first_linked = False

        for state_abbr, fips in STATE_FIPS_CODES.items():
            print(f"Fetching data for {state_abbr}...")
            payload = {
                "StateFipsCode": fips,
                "CountyFipsCode": "",
                "ZipCode": "",
                "InputParams": "",
                "Token": HRSA_TOKEN
            }

            try:
                response = requests.post(HRSA_API_URL, json=payload, timeout=30)
            except requests.exceptions.RequestException as e:
                print(f"Network error for {state_abbr}: {e}")
                continue

            if response.status_code != 200:
                print(f"Error {response.status_code} for {state_abbr}: {response.text[:200]}")
                continue

            try:
                data = response.json()
                centers = data.get("HCC", [])
            except Exception as e:
                print(f"Failed to parse response for {state_abbr}: {e}")
                continue

            print(f"Found {len(centers)} centers for {state_abbr}")

            for c in centers:
                try:
                    site_name = c.get("SITE_NM")
                    address = c.get("SITE_ADDRESS", "")
                    city = c.get("SITE_CITY", "")
                    state = c.get("SITE_STATE_ABBR", "")
                    phone = c.get("SITE_PHONE_NUM", "")
                    website = c.get("SITE_URL", "")
                    description = f"{c.get('HCC_TYP_DESC', '')} - {c.get('HCC_LOC_DESC', '')}"

                    tags = generate_tags(site_name, description)

                    # Create organization
                    organization = Organization(
                        name=site_name,
                        location=f"{city}, {state}",
                        capacity=None,
                        services="Healthcare, outreach, and preventive medical services.",
                        online_availability=False,
                        organization_type="Health Center",
                        image_url=None,
                        website_url=website,
                        description=description,
                        hours_of_operation="N/A",
                    )

                    # Create resource
                    resource = Resource(
                        title=f"{site_name} Medical Services",
                        organization_name=site_name,
                        services="Health Center Services",
                        eligibility="Open to the public",
                        languages_supported="English",
                        location=f"{address}, {city}, {state}",
                        topic="Medical Assistance",
                        online_availability=False,
                        hours_of_operation="N/A",
                        resource_url=website,
                        image_url=None,
                        description=description,
                        category="medical services",
                    )

                    # Attach tags if supported
                    if hasattr(resource, "tags"):
                        resource.tags = tags
                    if hasattr(organization, "tags"):
                        organization.tags = tags

                    db.session.add(organization)
                    db.session.add(resource)
                    db.session.commit()

                    organization.resources.append(resource)
                    db.session.commit()

                    if not first_linked:
                        organization.events.append(shared_event)
                        resource.events.append(shared_event)
                        db.session.commit()
                        first_linked = True

                except Exception as e:
                    print(f"Skipping record in {state_abbr}: {e}")
                    db.session.rollback()

        print("HRSA data import complete!")

if __name__ == "__main__":
    import_hrsa_data()