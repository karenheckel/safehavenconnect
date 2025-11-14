#!/usr/bin/env python3
"""
Fast image population script using concurrent API requests.
Uses the optimized utils_fast module for parallel image fetching.
"""

import sys
import os
from datetime import datetime
from utils_fast import get_images_batch_cached

# Import Flask app and models
from app import create_app
from models import db, Organization, Resource, Event

def populate_images():
    """Fetch and populate images for organizations, resources, and events."""
    
    app = create_app(os.environ.get('FLASK_ENV', 'production'))
    
    with app.app_context():
        print(f"[{datetime.now().strftime('%H:%M:%S')}] Starting image population...")
        
        # ============ ORGANIZATIONS ============
        print(f"\n[{datetime.now().strftime('%H:%M:%S')}] Fetching images for organizations...")
        orgs = Organization.query.filter(
            (Organization.image_url.is_(None)) | (Organization.image_url == 'None') | (Organization.image_url == '') | (Organization.image_url == 'NULL')
        ).all()
        
        print(f"Found {len(orgs)} organizations without images")
        
        if orgs:
            org_queries = [
                (org.id, org.organization_type or org.name)
                for org in orgs
            ]
            print(f"Fetching images for {len(org_queries)} items...")
            org_images = get_images_batch_cached(org_queries, max_workers=5)
            
            updated = 0
            for org in orgs:
                if org.id in org_images and org_images[org.id]:
                    org.image_url = org_images[org.id]
                    updated += 1
                    if updated <= 5:  # Print first 5
                        print(f"  ✓ {org.name}: {org.image_url}")
            
            db.session.commit()
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Updated {updated} organizations")
        else:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] No organizations need images")
        
        # ============ RESOURCES ============
        print(f"\n[{datetime.now().strftime('%H:%M:%S')}] Fetching images for resources...")
        resources = Resource.query.filter(
            (Resource.image_url.is_(None)) | (Resource.image_url == 'None') | (Resource.image_url == '') | (Resource.image_url == 'NULL')
        ).all()
        
        print(f"Found {len(resources)} resources without images")
        
        if resources:
            resource_queries = [
                (res.id, res.topic or res.category or res.title)
                for res in resources
            ]
            print(f"Fetching images for {len(resource_queries)} items...")
            resource_images = get_images_batch_cached(resource_queries, max_workers=5)
            
            updated = 0
            for res in resources:
                if res.id in resource_images and resource_images[res.id]:
                    res.image_url = resource_images[res.id]
                    updated += 1
                    if updated <= 5:  # Print first 5
                        print(f"  ✓ {res.title}: {res.image_url}")
            
            db.session.commit()
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Updated {updated} resources")
        else:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] No resources need images")
        
        # ============ EVENTS ============
        print(f"\n[{datetime.now().strftime('%H:%M:%S')}] Fetching images for events...")
        # Get events without images OR with invalid image URLs (like HRSA logos that return 404)
        events = Event.query.filter(
            (Event.image_url.is_(None)) | (Event.image_url == 'None') | (Event.image_url == '') | (Event.image_url == 'NULL') | (Event.image_url.like('%.hrsa.gov%'))
        ).all()
        
        print(f"Found {len(events)} events without images")
        
        if events:
            event_queries = [
                (evt.id, evt.event_type or evt.name)
                for evt in events
            ]
            print(f"Fetching images for {len(event_queries)} items...")
            event_images = get_images_batch_cached(event_queries, max_workers=5)
            
            updated = 0
            for evt in events:
                if evt.id in event_images and event_images[evt.id]:
                    evt.image_url = event_images[evt.id]
                    updated += 1
                    if updated <= 5:  # Print first 5
                        print(f"  ✓ {evt.name}: {evt.image_url}")
            
            db.session.commit()
            print(f"[{datetime.now().strftime('%H:%M:%S')}] Updated {updated} events")
        else:
            print(f"[{datetime.now().strftime('%H:%M:%S')}] No events need images")
        
        print(f"\n[{datetime.now().strftime('%H:%M:%S')}] ✓ Image population complete!")

if __name__ == "__main__":
    try:
        populate_images()
    except Exception as e:
        print(f"Error: {e}", file=sys.stderr)
        import traceback
        traceback.print_exc()
        sys.exit(1)
