# SafeHavenConnect API Documentation
# Disclaimer:documentation was ai generated
## Base URL
```
http://localhost:5000
```

## Authentication
Currently, the API does not require authentication. This should be implemented for production use.

## Response Format
All responses are in JSON format.

### Success Response
```json
{
  "id": 1,
  "name": "Example Organization",
}
```

### Error Response
```json
{
  "error": "Error message description"
}
```

## HTTP Status Codes
- `200 OK` - Request succeeded
- `201 Created` - Resource created successfully
- `400 Bad Request` - Invalid request data
- `404 Not Found` - Resource not found
- `500 Internal Server Error` - Server error

---

## Organizations API

### Get All Organizations
**Endpoint:** `GET /api/organizations`

**Query Parameters:**
- `location` (optional) - Filter by location (case-insensitive partial match)
- `type` (optional) - Filter by organization type (can be repeated for multiple types)
- `online` (optional) - Filter by online availability (true/false)
- `services` (optional) - Filter by services offered (can be repeated for multiple services)
- `hours` (optional) - Filter by hours of operation: "24/7", "weekdays", "weekends", "night", "n/a" (can be repeated)
- `sort` (optional) - Sort results: "name" (alphabetical), "state" (by state), default is "none"
- `page` (optional) - Page number for pagination (default: 1)
- `per_page` (optional) - Results per page (default: 12)

**Example Requests:**
```bash
GET /api/organizations?location=Austin&online=true
GET /api/organizations?type=Shelter&type=Clinic&sort=name
GET /api/organizations?hours=24/7&page=1&per_page=10
GET /api/organizations?services=counseling&services=legal&sort=state
```

**Example Response:**
```json
[
  {
    "id": 1,
    "name": "Safe Haven Shelter",
    "location": "Austin, TX",
    "capacity": 50,
    "services": "Emergency shelter, counseling, legal aid",
    "online_availability": true,
    "organization_type": "Shelter",
    "image_url": "https://example.com/shelter1.jpg",
    "website_url": "https://safehavenshelter.org",
    "description": "24/7 emergency shelter for domestic violence survivors",
    "created_at": "2025-10-10T20:00:00",
    "updated_at": "2025-10-10T20:00:00",
    "resource_ids": [1, 2],
    "event_ids": [1]
  }
]
```

### Get Organization by ID
**Endpoint:** `GET /api/organizations/<id>`

**Example Request:**
```bash
GET /api/organizations/1
```

**Example Response:**
```json
{
  "id": 1,
  "name": "Safe Haven Shelter",
  "location": "Austin, TX",
}
```

### Create Organization
**Endpoint:** `POST /api/organizations`

**Request Body:**
```json
{
  "name": "New Shelter",
  "location": "Dallas, TX",
  "capacity": 40,
  "services": "Emergency shelter, counseling",
  "online_availability": true,
  "organization_type": "Shelter",
  "image_url": "https://example.com/image.jpg",
  "website_url": "https://newshelter.org",
  "description": "Description of the organization"
}
```

**Example Response:** (Status: 201)
```json
{
  "id": 3,
  "name": "New Shelter",
  ...
}
```

### Update Organization
**Endpoint:** `PUT /api/organizations/<id>`

**Request Body:**
```json
{
  "capacity": 60,
  "services": "Emergency shelter, counseling, legal aid, job training"
}
```

**Example Response:**
```json
{
  "id": 1,
  "name": "Safe Haven Shelter",
  "capacity": 60,
  ...
}
```

### Delete Organization
**Endpoint:** `DELETE /api/organizations/<id>`

**Example Response:**
```json
{
  "message": "Organization deleted successfully"
}
```

### Get Organization's Resources
**Endpoint:** `GET /api/organizations/<id>/resources`

**Example Response:**
```json
[
  {
    "id": 1,
    "title": "Legal Aid for Survivors",
    ...
  }
]
```

### Get Organization's Events
**Endpoint:** `GET /api/organizations/<id>/events`

**Example Response:**
```json
[
  {
    "id": 1,
    "name": "Survivor Support Group",
    ...
  }
]
```

---

## Resources API

### Get All Resources
**Endpoint:** `GET /api/resources`

**Query Parameters:**
- `location` (optional) - Filter by location (case-insensitive partial match)
- `type` (optional) - Filter by resource topic/type (can be repeated for multiple types)
- `orgs` (optional) - Filter by organization name range (e.g., "A-C", "D-M") using alphabetical ranges
- `online` (optional) - Filter by online availability (true/false)
- `hours` (optional) - Filter by hours of operation: "24/7", "weekdays", "weekends", "night", "n/a" (can be repeated)
- `sort` (optional) - Sort results: "name" (by title), "state" (by state), default is "none"
- `page` (optional) - Page number for pagination (default: 1)
- `per_page` (optional) - Results per page (default: 12)

**Example Requests:**
```bash
GET /api/resources?topic=Legal&location=Austin
GET /api/resources?type=Financial&type=Medical&sort=name
GET /api/resources?online=true&hours=24/7
GET /api/resources?orgs=A-C&page=1&per_page=20
```

**Example Response:**
```json
[
  {
    "id": 1,
    "title": "Legal Aid for Survivors",
    "organization_name": "Legal Aid Society",
    "services": "Legal consultation, restraining orders, custody assistance",
    "eligibility": "Survivors of domestic violence",
    "languages_supported": "English, Spanish",
    "location": "Austin, TX",
    "topic": "Legal",
    "resource_url": "https://legalaid.org/dv",
    "image_url": "https://example.com/legal.jpg",
    "description": "Free legal services for domestic violence survivors",
    "created_at": "2025-10-10T20:00:00",
    "updated_at": "2025-10-10T20:00:00",
    "organization_ids": [1],
    "event_ids": [1]
  }
]
```

### Get Resource by ID
**Endpoint:** `GET /api/resources/<id>`

### Create Resource
**Endpoint:** `POST /api/resources`

**Request Body:**
```json
{
  "title": "Financial Assistance Program",
  "organization_name": "Community Aid",
  "services": "Emergency funds, rent assistance, utility help",
  "eligibility": "Low-income survivors",
  "languages_supported": "English, Spanish, Vietnamese",
  "location": "Houston, TX",
  "topic": "Financial",
  "resource_url": "https://communityaid.org/financial",
  "image_url": "https://example.com/financial.jpg",
  "description": "Financial support for survivors in crisis"
}
```

### Update Resource
**Endpoint:** `PUT /api/resources/<id>`

### Delete Resource
**Endpoint:** `DELETE /api/resources/<id>`

### Get Resource's Organizations
**Endpoint:** `GET /api/resources/<id>/organizations`

### Get Resource's Events
**Endpoint:** `GET /api/resources/<id>/events`

---

## Events API

### Get All Events
**Endpoint:** `GET /api/events`

**Query Parameters:**
- `type` (optional) - Filter by event type (can be repeated for multiple types)
- `location` (optional) - Filter by location (case-insensitive partial match)
- `online` (optional) - Filter by online status (true/false)
- `registration_open` (optional) - Filter by registration availability (true/false)
- `hours` (optional) - Filter by event time: "morning" (12am-11am), "afternoon" (12pm-4pm), "evening" (5pm-11pm), "n/a" (can be repeated)
- `sort` (optional) - Sort results: "name" (by event name), "state" (by state), default is "none"
- `page` (optional) - Page number for pagination (default: 1)
- `per_page` (optional) - Results per page (default: 10)

**Example Requests:**
```bash
GET /api/events?online=true&registration_open=true
GET /api/events?type=Workshop&type=Support&sort=name
GET /api/events?location=Austin&hours=evening
GET /api/events?registration_open=true&sort=state&page=2
```

**Example Response:**
```json
[
  {
    "id": 1,
    "name": "Online Safety Workshop",
    "location": "Virtual",
    "start_time": "2025-10-20T19:00:00",
    "date": "2025-10-20",
    "duration": 60,
    "event_type": "Workshop",
    "is_online": true,
    "registration_open": true,
    "event_url": "https://events.org/safety-workshop",
    "image_url": "https://example.com/event.jpg",
    "description": "Learn about digital safety and privacy",
    "map_url": null,
    "created_at": "2025-10-10T20:00:00",
    "updated_at": "2025-10-10T20:00:00",
    "organization_ids": [2],
    "resource_ids": [2]
  }
]
```

### Get Event by ID
**Endpoint:** `GET /api/events/<id>`

### Create Event
**Endpoint:** `POST /api/events`

**Request Body:**
```json
{
  "name": "Healing Circle",
  "location": "Community Center",
  "start_time": "2025-11-01T18:00:00",
  "date": "2025-11-01",
  "duration": 120,
  "event_type": "Support Group",
  "is_online": false,
  "registration_open": true,
  "event_url": "https://events.org/healing-circle",
  "image_url": "https://example.com/healing.jpg",
  "description": "Monthly healing circle for survivors",
  "map_url": "https://maps.google.com/..."
}
```

### Update Event
**Endpoint:** `PUT /api/events/<id>`

### Delete Event
**Endpoint:** `DELETE /api/events/<id>`

### Get Event's Organizations
**Endpoint:** `GET /api/events/<id>/organizations`

### Get Event's Resources
**Endpoint:** `GET /api/events/<id>/resources`

---

## Utility Endpoints

### Health Check
**Endpoint:** `GET /api/health`

**Example Response:**
```json
{
  "status": "healthy",
  "message": "SafeHavenConnect API is running"
}
```

### API Information
**Endpoint:** `GET /`

**Example Response:**
```json
{
  "message": "SafeHavenConnect API",
  "version": "1.0",
  "endpoints": {
    "organizations": "/api/organizations",
    "resources": "/api/resources",
    "events": "/api/events",
    "health": "/api/health"
  }
}
```

---

## Data Models

### Organization Model
```
- id: Integer (Primary Key)
- name: String (Required)
- location: String (Required)
- capacity: Integer
- services: Text
- online_availability: Boolean
- organization_type: String
- image_url: String
- website_url: String
- description: Text
- created_at: DateTime
- updated_at: DateTime
```

### Resource Model
```
- id: Integer (Primary Key)
- title: String (Required)
- organization_name: String
- services: Text
- eligibility: Text
- languages_supported: String
- location: String
- topic: String
- resource_url: String
- image_url: String
- description: Text
- created_at: DateTime
- updated_at: DateTime
```

### Event Model
```
- id: Integer (Primary Key)
- name: String (Required)
- location: String
- start_time: DateTime
- date: Date
- duration: Integer (minutes)
- event_type: String
- is_online: Boolean
- registration_open: Boolean
- event_url: String
- image_url: String
- description: Text
- map_url: String
- created_at: DateTime
- updated_at: DateTime
```

## Relationships

- **Organizations ↔ Resources**: Many-to-Many (via `organization_resources` table)
- **Organizations ↔ Events**: Many-to-Many (via `organization_events` table)
- **Resources ↔ Events**: Many-to-Many (via `resource_events` table)

## Filtering & Sorting Guide

### Filtering Overview
All filtering parameters are applied as **AND** conditions unless they have multiple values (like `type`, `services`, `hours`), in which case multiple values are combined as **OR** within that filter.

**Example:** `?location=Austin&type=Shelter&type=Clinic&online=true` means:
- Location contains "Austin" **AND**
- (Type contains "Shelter" **OR** type contains "Clinic") **AND**
- Online availability is true

### Pagination Response
All list endpoints (`/api/organizations`, `/api/resources`, `/api/events`) return paginated responses with the following structure:

```json
{
  "data": [
    {
      "id": 1,
      "name": "Example",
      ...
    }
  ],
  "pagination": {
    "total": 50,
    "page": 1,
    "per_page": 12,
    "pages": 5,
    "has_next": true,
    "has_prev": false
  }
}
```

### Sorting Options

#### Organizations
- `sort=name` - Sort alphabetically by organization name
- `sort=state` - Sort by state (extracted from location field)

#### Resources
- `sort=name` - Sort alphabetically by resource title
- `sort=state` - Sort by state (extracted from location field)

#### Events
- `sort=name` - Sort alphabetically by event name
- `sort=state` - Sort by state (extracted from location field)

### Hours of Operation Filters

#### Organizations & Resources
- `hours=24/7` - Available 24 hours
- `hours=weekdays` - Available on weekdays (Mon-Fri)
- `hours=weekends` - Available on weekends (Sat-Sun)
- `hours=night` - Available during night hours (8pm-5am)
- `hours=n/a` - No hours specified

#### Events
- `hours=morning` - Events starting 12am-11am
- `hours=afternoon` - Events starting 12pm-4pm
- `hours=evening` - Events starting 5pm-11pm
- `hours=n/a` - No specific time

### Advanced Filter Examples

#### Get all 24/7 shelters in Austin, sorted by name
```bash
GET /api/organizations?location=Austin&organization_type=Shelter&hours=24/7&sort=name
```

#### Get legal and financial resources available online
```bash
GET /api/resources?type=Legal&type=Financial&online=true&sort=name
```

#### Get evening workshops with open registration
```bash
GET /api/events?type=Workshop&hours=evening&registration_open=true&sort=name
```

#### Get in-person resources in Dallas, paginate with 20 results per page
```bash
GET /api/resources?location=Dallas&online=false&page=1&per_page=20
```

#### Get all organizations with multiple filters and pagination
```bash
GET /api/organizations?location=Texas&services=counseling&hours=weekdays&sort=state&page=2&per_page=15
```

## Notes

1. All datetime fields are in ISO 8601 format
2. Filtering is case-insensitive and supports partial matches
3. The API uses Flask-CORS to allow cross-origin requests
4. All IDs are auto-incrementing integers
5. Timestamps are automatically managed by SQLAlchemy
6. Multiple query parameters with the same name (e.g., `type=X&type=Y`) create OR conditions
7. Location filtering uses the full location string (e.g., "Austin, TX")
