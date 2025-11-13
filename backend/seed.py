import os
import csv

DATABASE_URL = "postgresql://safehaven:safehaven123@db:5432/safehavenconnect"
os.environ["DATABASE_URL"] = DATABASE_URL

from datetime import datetime
from app import create_app, db
from models import Organization, Resource, Event

app = create_app()
app.app_context().push()


def parse_bool(val):
    return str(val).strip().lower() in ("1", "true", "yes")


def parse_int(val):
    try:
        return int(val)
    except:
        return None


def parse_datetime(val):
    if not val or val == "NULL":
        return None
    try:
        return datetime.fromisoformat(val)
    except:
        return None


def parse_date(val):
    if not val or val == "NULL":
        return None
    try:
        return datetime.fromisoformat(val).date()
    except:
        return None


def seed_organizations(path):
    print(f"Loading organizations from {path}")

    with open(path, encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter="|")
        count = 0

        for row in reader:
            org = Organization(
                name=row["name"],
                location=row["location"],
                capacity=parse_int(row["capacity"]),
                services=row["services"],
                online_availability=parse_bool(row["online_availability"]),
                organization_type=row["organization_type"],
                image_url=row["image_url"],
                website_url=row["website_url"],
                description=row["description"],
                hours_of_operation=row["hours_of_operation"]
            )
            db.session.add(org)
            count += 1

        db.session.commit()
        print(f"Inserted {count} organizations")


def seed_resources(path):
    print(f"Loading resources from {path}")

    with open(path, encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter="|")
        count = 0

        for row in reader:
            resource = Resource(
                title=row.get("title"),
                organization_name=row.get("organization_name"),
                services=row.get("services"),
                eligibility=row.get("eligibility"),
                languages_supported=row.get("languages_supported"),
                location=row.get("location"),
                topic=row.get("topic"),
                online_availability=parse_bool(row.get("online_availability")),
                hours_of_operation=row.get("hours_of_operation"),
                resource_url=row.get("resource_url"),
                image_url=row.get("image_url"),
                description=row.get("description")
            )

            db.session.add(resource)
            count += 1

        db.session.commit()
        print(f"Inserted {count} resources")


def seed_events(path):
    print(f"Loading events from {path}")

    with open(path, encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter="|")
        count = 0

        for row in reader:
            event = Event(
                name=row["name"],
                location=row["location"],
                start_time=parse_datetime(row["start_time"]),
                end_time=parse_datetime(row["end_time"]),
                date=parse_date(row["date"]),
                event_type=row["event_type"],
                is_online=parse_bool(row["is_online"]),
                registration_open=parse_bool(row["registration_open"]),
                event_url=row["event_url"],
                image_url=row["image_url"],
                description=row["description"],
                map_url=row["map_url"]
            )
            db.session.add(event)
            count += 1

        db.session.commit()
        print(f"Inserted {count} events")


def seed_org_resources(path):
    print(f"Loading organization-resources from {path}")

    with open(path, encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter="|")
        count = 0

        for row in reader:
            org = Organization.query.get(parse_int(row["organization_id"]))
            res = Resource.query.get(parse_int(row["resource_id"]))

            if org and res:
                org.resources.append(res)
                count += 1

        db.session.commit()
        print(f"Linked {count} organization-resource rows")


def seed_org_events(path):
    print(f"Loading organization-events from {path}")

    with open(path, encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter="|")
        count = 0

        for row in reader:
            org = Organization.query.get(parse_int(row["organization_id"]))
            ev = Event.query.get(parse_int(row["event_id"]))

            if org and ev:
                org.events.append(ev)
                count += 1

        db.session.commit()
        print(f"Linked {count} organization-event rows")


def seed_resource_events(path):
    print(f"Loading resource-events from {path}")

    with open(path, encoding="utf-8") as f:
        reader = csv.DictReader(f, delimiter="|")
        count = 0

        for row in reader:
            res = Resource.query.get(parse_int(row["resource_id"]))
            ev = Event.query.get(parse_int(row["event_id"]))

            if res and ev:
                res.events.append(ev)
                count += 1

        db.session.commit()
        print(f"Linked {count} resource-event rows")


def main():
    print("Starting database seeding...")

    seed_organizations("organizations.csv")
    seed_resources("resources.csv")
    seed_events("events.csv")

    seed_org_resources("organizations_resources.csv")
    seed_org_events("organization_events.csv")
    seed_resource_events("events_resources.csv")

    print(" DONE — All database tables populated!")


if __name__ == "__main__":
    main()
