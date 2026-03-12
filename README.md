# SafeHavenConnect 

## Description
SafeHavenConnect is a full-stack web platform that helps individuals locate and access domestic-violence support resources, including shelters, advocacy organizations, legal aid, and community services.

The platform aggregates and visualizes information from multiple sources to make support services easier to find. Users can search and filter organizations, explore resource availability, and interact with data visualizations that highlight service distribution.

This project focuses on technology for social impact, aiming to reduce barriers to accessing support resources.

## Live Demo
https://youtu.be/8QxRENdTUl8

## Full-Stack Architecture
SafeHavenConnect is implemented using a modern full-stack architecture:

### Frontend
- React
- Bootstrap

### Backend
- Flask
- REST API
- SQLAlchemy

### Infrastructure
- AWS EC2
- Docker

### Database
- PostgreSQL

## Data sources 
- https://data.hrsa.gov/tools/web-services - Medical centers API [Organizations]
- https://topapis.com/homeless-shelter-api/ - Homeless Shelter API [Resources]
- https://apiportal.211.org/ - 211 National Data Platform [Organizations and Resources]
- https://eventbrite.com - Events held across the US (online and in-person) [Events]

## Questions that our site answers
1. Where is the nearest domestic violence shelter and what services do they offer?
2. What free or affordable legal resources can I access based on my situation?
3. What upcoming events, workshops, or support groups are available for survivors in my area or online?

## Contributors
Developed by:
- Karen Heckel
- Brianna Flores
- Parul Sadasivuni
- Jonathan Ho
- Ali Novruzov

## Website (no longer active)
https://safehavenconnect.me/

## Backend API
https://backend.safehavenconnect.me

## API Documentation
https://documenter.getpostman.com/view/48794305/2sB3WjzjPd

## Installation

Clone the repository:

```
git clone https://github.com/karenheckel/safehavenconnect.git
cd safehavenconnect
```

### Backend Setup
Create a virtual environment:

```
python3 -m venv venv
source venv/bin/activate
```

Install dependencies:

```
pip install -r requirements.txt
```

Start the backend server:

```
flask run
```

The API will run locally at:

```
http://localhost:5000
```

### Frontend Setup

Navigate to the frontend directory:

```
cd frontend
```

Install dependencies:

```
npm install
```

Start the development server:

```
npm start
```

The frontend will run at:

```
http://localhost:3000
```
