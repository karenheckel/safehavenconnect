"""
Database initialization script
Creates tables and optionally populates with sample data
"""
from app import create_app, ensure_columns, backfill_events_end_time
from models import db, Organization, Resource, Event
from datetime import datetime, date


def init_database(drop=True):
    app = create_app()
    
    with app.app_context():
        if drop:
            db.drop_all()
        db.create_all()
        # Ensure schema evolves safely
        try:
            ensure_columns()
            backfill_events_end_time()
        except Exception:
            pass
        


def populate_sample_data():
    app = create_app()
    
    with app.app_context():
        org1 = Organization(
            name="Safe Haven Shelter",
            location="Austin, TX",
            capacity=50,
            services="Emergency shelter, counseling, legal aid",
            online_availability=True,
            organization_type="Shelter",
            image_url="https://example.com/shelter1.jpg",
            website_url="https://safehavenshelter.org",
            description="24/7 emergency shelter for domestic violence survivors",
            hours_of_operation="24/7"
        )
        
        org2 = Organization(
            name="Hope Support Center",
            location="Houston, TX",
            capacity=30,
            services="Counseling, support groups, financial assistance",
            online_availability=True,
            organization_type="Support Center",
            image_url="https://example.com/support1.jpg",
            website_url="https://hopesupport.org",
            description="Comprehensive support services for survivors",
            hours_of_operation="Mon-Fri 9am-6pm"
        )
        
        resource1 = Resource(
            title="Legal Aid for Survivors",
            organization_name="Legal Aid Society",
            services="Legal consultation, restraining orders, custody assistance",
            eligibility="Survivors of domestic violence",
            languages_supported="English, Spanish",
            location="Austin, TX",
            topic="Legal",
            online_availability=True,
            hours_of_operation="Mon-Fri 9am-5pm",
            resource_url="https://legalaid.org/dv",
            image_url="https://example.com/legal.jpg",
            description="Free legal services for domestic violence survivors"
        )
        
        resource2 = Resource(
            title="Mental Health Counseling",
            organization_name="Wellness Center",
            services="Individual therapy, group therapy, trauma counseling",
            eligibility="All survivors",
            languages_supported="English, Spanish, Vietnamese",
            location="Houston, TX",
            topic="Mental Health",
            online_availability=True,
            hours_of_operation="Mon-Sat 9am-7pm",
            resource_url="https://wellness.org/counseling",
            image_url="https://example.com/counseling.jpg",
            description="Professional mental health support for survivors"
        )
        
        event1 = Event(
            name="Survivor Support Group",
            location="Austin Community Center",
            start_time=datetime(2025, 10, 15, 18, 0),
            end_time=datetime(2025, 10, 15, 19, 30),
            date=date(2025, 10, 15),
            duration=90,
            event_type="Support Group",
            is_online=False,
            registration_open=True,
            event_url="https://events.org/support-group",
            image_url="https://example.com/event1.jpg",
            description="Weekly support group for survivors",
            map_url="https://maps.google.com/..."
        )
        
        event2 = Event(
            name="Online Safety Workshop",
            location="Virtual",
            start_time=datetime(2025, 10, 20, 19, 0),
            end_time=datetime(2025, 10, 20, 20, 0),
            date=date(2025, 10, 20),
            duration=60,
            event_type="Workshop",
            is_online=True,
            registration_open=True,
            event_url="https://events.org/safety-workshop",
            image_url="https://example.com/event2.jpg",
            description="Learn about digital safety and privacy",
            map_url=None
        )
        
        db.session.add_all([org1, org2, resource1, resource2, event1, event2])
        db.session.commit()
        
        org1.resources.append(resource1)
        org1.events.append(event1)
        org2.resources.append(resource2)
        org2.events.append(event2)
        resource1.events.append(event1)
        resource2.events.append(event2)
        
        db.session.commit()
        
        print("Sample data populated successfully!")
        print(f"Organizations: {Organization.query.count()}")
        print(f"Resources: {Resource.query.count()}")
        print(f"Events: {Event.query.count()}")


if __name__ == '__main__':
    import sys
    
    args = set(sys.argv[1:])
    with_data = '--with-data' in args
    create_only = '--create-only' in args

    if with_data:
        init_database(drop=not create_only)
        populate_sample_data()
    elif create_only:
        init_database(drop=False)
    else:
        init_database()
