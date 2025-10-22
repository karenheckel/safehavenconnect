"""
Imports HRSA Health Center data for all 50 U.S. states into the database.
"""

import requests
from models import db, Resource
from app import create_app

# HRSA endpoint and your token
HRSA_API_URL = "https://data.hrsa.gov/HDWAPI3_External/api/v1/GetHealthCentersByArea"
HRSA_TOKEN = "440ab3e7-e7dc-49cb-9fb2-6548d5f0d22b"

# State abbreviations and FIPS codes for the 50 U.S. states
STATE_FIPS_CODES = {
    "AL": "01", "AK": "02", "AZ": "04", "AR": "05", "CA": "06",
    "CO": "08", "CT": "09", "DE": "10", "FL": "12", "GA": "13",
    "HI": "15", "ID": "16", "IL": "17", "IN": "18", "IA": "19",
    "KS": "20", "KY": "21", "LA": "22", "ME": "23", "MD": "24",
    "MA": "25", "MI": "26", "MN": "27", "MS": "28", "MO": "29",
    "MT": "30", "NE": "31", "NV": "32", "NH": "33", "NJ": "34",
    "NM": "35", "NY": "36", "NC": "37", "ND": "38", "OH": "39",
    "OK": "40", "OR": "41", "PA": "42", "RI": "44", "SC": "45",
    "SD": "46", "TN": "47", "TX": "48", "UT": "49", "VT": "50",
    "VA": "51", "WA": "53", "WV": "54", "WI": "55", "WY": "56"
}


def import_hrsa_data():
    """Fetch and store HRSA health center data for each U.S. state."""
    app = create_app()
    with app.app_context():
        for state_abbr, fips in STATE_FIPS_CODES.items():
            print(f"Fetching data for {state_abbr} (FIPS {fips})...")

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
                print(f"Error {response.status_code} for {state_abbr}")
                print(f"Response: {response.text[:200]}")
                continue

            try:
                data = response.json()
            except ValueError:
                print(f"Invalid JSON for {state_abbr}. Response: {response.text[:200]}")
                continue

            centers = data.get("HCC", [])
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

                    # Create Resource object
                    resource = Resource(
                        title=site_name,
                        organization_name=site_name,
                        services="Health Center",
                        eligibility="Open to public",
                        languages_supported="English",
                        location=f"{address}, {city}, {state}",
                        topic="Health Services",
                        online_availability=False,
                        hours_of_operation="N/A",
                        resource_url=website,
                        image_url=None,
                        description=description,
                        category="medical services"
                    )

                    db.session.add(resource)
                except Exception as e:
                    print(f"Skipping one record in {state_abbr}: {e}")
                    db.session.rollback()

            db.session.commit()
            print(f"Imported all records for {state_abbr}\n")

    print("HRSA data import complete!")


if __name__ == "__main__":
    import_hrsa_data()
