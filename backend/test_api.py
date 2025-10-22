"""
Backend API Tests for SafeHavenConnect
Tests at least one endpoint per resource using pytest
"""

import pytest
import json
from datetime import datetime
from app import create_app
from models import db, Organization, Resource, Event


@pytest.fixture
def app():
    """Create and configure a test app instance"""
    app = create_app()
    app.config['TESTING'] = True
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
    
    with app.app_context():
        db.create_all()
        yield app
        db.session.remove()
        db.drop_all()


@pytest.fixture
def client(app):
    """Create a test client for the app"""
    return app.test_client()


@pytest.fixture
def sample_organization(app):
    """Create a sample organization for testing"""
    with app.app_context():
        org = Organization(
            name="Safe Haven Shelter",
            location="Austin, TX",
            capacity=50,
            services="Emergency shelter, counseling",
            online_availability=True,
            organization_type="Shelter"
        )
        db.session.add(org)
        db.session.commit()
        return org.id


@pytest.fixture
def sample_resource(app):
    """Create a sample resource for testing"""
    with app.app_context():
        resource = Resource(
            title="Legal Aid Hotline",
            description="Free legal assistance",
            location="Nationwide",
            topic="Legal",
            services="Legal consultation",
            eligibility="All survivors",
            languages_supported="English, Spanish"
        )
        db.session.add(resource)
        db.session.commit()
        return resource.id


@pytest.fixture
def sample_event(app):
    """Create a sample event for testing"""
    with app.app_context():
        event = Event(
            name="Support Group Meeting",
            location="Austin Community Center",
            start_time=datetime(2025, 11, 1, 18, 0),
            end_time=datetime(2025, 11, 1, 20, 0),
            event_type="Support Group",
            is_online=False,
            registration_open=True
        )
        db.session.add(event)
        db.session.commit()
        return event.id


# ============= Organization Tests =============

def test_get_organizations(client, sample_organization):
    """Test GET /api/organizations endpoint"""
    response = client.get('/api/organizations')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)
    assert len(data) > 0
    assert data[0]['name'] == "Safe Haven Shelter"


def test_get_organization_by_id(client, sample_organization):
    """Test GET /api/organizations/<id> endpoint"""
    response = client.get(f'/api/organizations/{sample_organization}')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['name'] == "Safe Haven Shelter"
    assert data['location'] == "Austin, TX"


def test_get_organization_not_found(client):
    """Test GET /api/organizations/<id> with invalid ID"""
    response = client.get('/api/organizations/9999')
    assert response.status_code == 404


def test_create_organization(client):
    """Test POST /api/organizations endpoint"""
    new_org = {
        "name": "Hope House",
        "location": "Dallas, TX",
        "capacity": 30,
        "services": "Shelter, food",
        "online_availability": False,
        "organization_type": "Shelter"
    }
    response = client.post('/api/organizations',
                          data=json.dumps(new_org),
                          content_type='application/json')
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['name'] == "Hope House"


def test_get_organizations_with_filter(client, sample_organization):
    """Test GET /api/organizations with location filter"""
    response = client.get('/api/organizations?location=Austin')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) > 0


# ============= Resource Tests =============

def test_get_resources(client, sample_resource):
    """Test GET /api/resources endpoint"""
    response = client.get('/api/resources')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)
    assert len(data) > 0
    assert data[0]['title'] == "Legal Aid Hotline"


def test_get_resource_by_id(client, sample_resource):
    """Test GET /api/resources/<id> endpoint"""
    response = client.get(f'/api/resources/{sample_resource}')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['title'] == "Legal Aid Hotline"
    assert data['topic'] == "Legal"


def test_get_resource_not_found(client):
    """Test GET /api/resources/<id> with invalid ID"""
    response = client.get('/api/resources/9999')
    assert response.status_code == 404


def test_create_resource(client):
    """Test POST /api/resources endpoint"""
    new_resource = {
        "title": "Mental Health Hotline",
        "description": "24/7 crisis support",
        "location": "Nationwide",
        "topic": "Mental Health",
        "services": "Crisis counseling",
        "eligibility": "All",
        "languages_supported": "English"
    }
    response = client.post('/api/resources',
                          data=json.dumps(new_resource),
                          content_type='application/json')
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['title'] == "Mental Health Hotline"


def test_get_resources_with_filter(client, sample_resource):
    """Test GET /api/resources with topic filter"""
    response = client.get('/api/resources?topic=Legal')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) > 0


# ============= Event Tests =============

def test_get_events(client, sample_event):
    """Test GET /api/events endpoint"""
    response = client.get('/api/events')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert isinstance(data, list)
    assert len(data) > 0
    assert data[0]['name'] == "Support Group Meeting"


def test_get_event_by_id(client, sample_event):
    """Test GET /api/events/<id> endpoint"""
    response = client.get(f'/api/events/{sample_event}')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['name'] == "Support Group Meeting"
    assert data['event_type'] == "Support Group"


def test_get_event_not_found(client):
    """Test GET /api/events/<id> with invalid ID"""
    response = client.get('/api/events/9999')
    assert response.status_code == 404


def test_create_event(client):
    """Test POST /api/events endpoint"""
    new_event = {
        "name": "Workshop: Safety Planning",
        "location": "Online",
        "start_time": "2025-11-15T14:00:00",
        "end_time": "2025-11-15T16:00:00",
        "event_type": "Workshop",
        "is_online": True,
        "registration_open": True
    }
    response = client.post('/api/events',
                          data=json.dumps(new_event),
                          content_type='application/json')
    assert response.status_code == 201
    data = json.loads(response.data)
    assert data['name'] == "Workshop: Safety Planning"


def test_get_events_with_filter(client, sample_event):
    """Test GET /api/events with type filter"""
    response = client.get('/api/events?type=Support Group')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert len(data) > 0


# ============= Health Check Test =============

def test_health_check(client):
    """Test GET /api/health endpoint"""
    response = client.get('/api/health')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['status'] == 'healthy'
    assert 'message' in data


# ============= Root Endpoint Test =============

def test_root_endpoint(client):
    """Test GET / endpoint"""
    response = client.get('/')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert 'message' in data
    assert 'SafeHavenConnect' in data['message']


# ============= Update Tests =============

def test_update_organization(client, sample_organization):
    """Test PUT /api/organizations/<id> endpoint"""
    update_data = {
        "capacity": 75
    }
    response = client.put(f'/api/organizations/{sample_organization}',
                         data=json.dumps(update_data),
                         content_type='application/json')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['capacity'] == 75


def test_update_resource(client, sample_resource):
    """Test PUT /api/resources/<id> endpoint"""
    update_data = {
        "description": "Updated description"
    }
    response = client.put(f'/api/resources/{sample_resource}',
                         data=json.dumps(update_data),
                         content_type='application/json')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['description'] == "Updated description"


def test_update_event(client, sample_event):
    """Test PUT /api/events/<id> endpoint"""
    update_data = {
        "registration_open": False
    }
    response = client.put(f'/api/events/{sample_event}',
                         data=json.dumps(update_data),
                         content_type='application/json')
    assert response.status_code == 200
    data = json.loads(response.data)
    assert data['registration_open'] == False


# ============= Delete Tests =============

def test_delete_organization(client, sample_organization):
    """Test DELETE /api/organizations/<id> endpoint"""
    response = client.delete(f'/api/organizations/{sample_organization}')
    assert response.status_code == 200
    
    # Verify deletion
    get_response = client.get(f'/api/organizations/{sample_organization}')
    assert get_response.status_code == 404


def test_delete_resource(client, sample_resource):
    """Test DELETE /api/resources/<id> endpoint"""
    response = client.delete(f'/api/resources/{sample_resource}')
    assert response.status_code == 200
    
    # Verify deletion
    get_response = client.get(f'/api/resources/{sample_resource}')
    assert get_response.status_code == 404


def test_delete_event(client, sample_event):
    """Test DELETE /api/events/<id> endpoint"""
    response = client.delete(f'/api/events/{sample_event}')
    assert response.status_code == 200
    
    # Verify deletion
    get_response = client.get(f'/api/events/{sample_event}')
    assert get_response.status_code == 404
