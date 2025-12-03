# SafeHavenConnect Technical Report

---


## Purpose/Motivation
SafeHavenConnect is a platform designed to help individuals struggling to find trustworthy, accessible, and local resources for safety, legal, medical, financial, and community support. Our goal is to connect users with verified organizations and events while providing a platform that empowers them to take the next steps toward safety and recovery.

---

## Frontend
The frontend of our website was developed using React.js with Vite as the build tool and React Bootstrap for responsive UI design. The goal of the frontend is to provide users with an intuitive and accessible interface for navigating events, organizations, and resources related to domestic violence support. It serves as the primary interaction layer between the user and our backend API.

-  The color palette uses #cde5d7 (mint green) with black text and outlines
- All components are designed to be responsive using Bootstrap’s grid system (Container, Row, Col).
- Reusable React Bootstrap components (e.g., Card, Button)

---

## Backend
The backend was built using Flask (Python) with SQLAlchemy as the ORM for database interactions and Gunicorn as the production WSGI server. The backend serves as the API layer, exposing RESTful endpoints that allow the frontend to retrieve structured data about organizations, resources, and events. It handles all database queries, manages many-to-many relationships between models, and ensures data consistency across the application. The backend is containerized using Docker and deployed on AWS EC2, with a PostgreSQL database running in a separate container managed via Docker Compose. Health check endpoints (/api/health) allow monitoring of the API status, and the system is designed to scale horizontally by adding more Gunicorn workers or container replicas as needed.

---

## Database
The database uses PostgreSQL 15 (alpine) running in a Docker container, with SQLAlchemy as the ORM layer for Python-based interactions. The schema consists of three primary models—Organizations, Resources, and Events—with many-to-many relationships managed through three association tables: organization_resources, organization_events, and resource_events. Each model includes metadata fields such as created_at and updated_at timestamps, and all primary keys use auto-incrementing integers for unique identification.

Data was primarily sourced from the Health Resources and Services Administration (HRSA) Data Warehouse API, which provided information about federally qualified health centers across multiple states (California, Texas, New York, Florida, and Illinois). Each health center was modeled as both an Organization and a Resource, with a shared "National Health Access Week" Event linking them together. We also integrated data from the RapidAPI Homeless Shelter API for shelter-specific resources in major Texas cities (Austin, Houston, and Dallas). Additionally, we explored the Eventbrite API for community events, though this required valid OAuth tokens and encountered quota limitations during testing.

---

## User Stories

1. Non-English speaker: toggle website language
    - Implemented using a Google Translate widget
    - Estimated time: 1 hour → Actual: ~2 hours

2. User clicking on a card to view its detail page
    - Implemented clickable cards for all models that lead to detailed instance pages
    - Estimated: 1 hour per page → Actual: ~1 hour per page

3. Pagination for browsing large datasets
    - Pagination added to Events, Resources, and Organizations pages so users can see the number of cards presented
    - Estimated: 1 hour → Actual: slightly over 1 hour due to initial logic complexity

4. Assistive technology that is inclusive, fast, and mobile-friendly. (like Lighthouse score ≥ 90 for performance and accessibility or Meets WCAG AA standards)
    - Added alt-text to all images.
    - Improved color contrast for WCAG AA compliance
    - Troubleshot Lighthouse performance ≥ 90
    - Estimated: 0.5 hours → Actual: ~1 hour due to debugging unused JS and load latency

5. Site maintainer testing endpoints via Postman 
    - Implemented Postman collections tied to backend routes
    - Run before each deployment for regression testing
    - Estimated time: 1 hour → Actual: 1 hour

6. Developer ensuring correct data relationships on the frontend
    - Many-to-many tables properly defined
    - Ensures consistent and accurate frontend display
    - Estimated time: 1 hour → Actual: 1 hour

7. Survivor seeking relevant help, filtering resources by multiple criteria
    - Implemented filtering by type, online availability, organization name, and hours
    - Estimated time: 1 hour → Actual: 1 hour
  
8. New site visitor looking for search bar integration to search keywords
    - Implemented a search page with a search bar in the navigation bar
    - Able to search across all models and instances
    - Estimated time: 2 hours → Actual: 3 hours

9. User browsing for legal aid resources
    - Implemented searching on resource page that shows relevant instances when looking up "legal aid"
    - Estimated time: 1 hour → Actual: 1 hour

10. Searching within each model separately
    - Added search bar to each model page, ensuring most relevant cards within that model show up first
    - Estimated time: 3 hours → Actual: 4 hours

11. User looking to filter organizations based on location
    - Added sort for locations based on state
    - Estimated time: 1 hour → Actual: 1 hour

12. User looking to filter resources that are available online
    - Added filter for online availability
    - Estimated time: 1 hour → Actual: 1 hour

13. User looking to sort resources
    - Implemented sorting by location (state) or by name
    - Estimated time: 1 hour → Actual: 1 hour

14. User looking to sort organizations
    - Implemented sorting by location (state) or by name
    - Estimated time: 1 hour → Actual: 1 hour

15. User wants searches to highlight words on page that match prompt
    - Implemented highlighting for word/phrase matches in the data
    - Estimated time: 1 hour → Actual: 2 hours

16. User would like to find a nearby shelter
    - Implemented by adding filtering by location on each model page
    - Estimated time: 1 hour → Actual: 2 hours

17. Developer wants to ensure models maintain correct relationships (many-to-many)
    - Implemented by displaying the connected instances accurately on the frontend
    - Estimated time: 1 hour → Actual: 1 hour

18. Site maintainer wants to test each API endpoint through Postman collections
    - Created a Postman collection covering all API routes and is used before each deployment
    - Estimated time: 1 hour → Actual: 2 hours

19. User looking to explore organizations and see images, links, and descriptions of them
    - Added a website button and relevant photo next to each organization description
    - Estimated time: 2 hours → Actual: 2 hours

20. Developer wants a page dedicated to visualizations of the website data
    - Added Visualizations with a bar chart, pie chart, and bubble chart for each model page
    - Estimated time: 1 hour → Actual: 2 hours
---

## Data Scraping
We made API calls to the Homeless Shelter API and the Health Resources and Services Administration API to collect data on shelters and medical centers that survivors could access to get the help they need. 

---

## API Documentation
The SafeHavenConnect API provides structured access to data about organizations, resources, and events that support survivors of domestic violence. It allows clients to retrieve all instances or specific entries for each model.
### Model and Endpoints

#### Organizations
- /organizations → GET all
    - Goal: Retrieve a list of all organizations offering domestic violence support services.
    - Input Parameters: None
- /organizations/:id → GET one
    - Goal: Fetch detailed information for a single organization.
    - Input Parameters:
        - `id` (integer) – Unique identifier for the organization.
#### Resources
- **GET /resources**
  - **Goal:** Retrieve a list of all resources available to survivors, such as legal aid, medical services, and educational materials.
  - **Input Parameters:** None
- **GET /resources/:id**
  - **Goal:** Fetch detailed information for a specific resource.
  - **Input Parameters:**
    - `id` (integer) – Unique identifier for the resource.

#### Events
- **GET /events**
  - **Goal:** Retrieve a list of all upcoming events related to domestic violence support.
  - **Input Parameters:** None
- **GET /events/:id**
  - **Goal:** Fetch detailed information for a single event by its ID.
  - **Input Parameters:**
    - `id` (integer) – Unique identifier for the event.

---

### Events
- **Description:** Any relevant events to the mission (fundraising, informational sessions, community building, etc)
- **Attributes:** Title, location, date, time, event type, organization, image

### Organizations
- **Description:** Any organization that provides resources or support for victims of domestic violence
- **Attributes:** Title, location, services, hours, online availability, target demographic, logo

### Resources
- **Description:** Any resource provided to victims of domestic violence (shelters, hotlines, guides, etc)
- **Attributes:** Title, location, type, hours, online availability, organization, logo

---


## Instances
### Events
- **Attributes:** Event title, location, date, time, event type  
- **Media:** Image, link to event website, map  
- **Related cards:** Related organizations and resources

### Organizations
- **Attributes:** Organization name, location, type, services, hours, online availability
- **Media:** Related image, link
- **Related cards:** Related resources and events

### Resources
- **Attributes:** Resource name, location, type, hours, online availability, related organization name  
- **Media:** Related image/logo, link  
- **Related cards:** Related organizations and events

---

## Toolchains
- React: Frontend development, create reusable components
- Vite: Build too used to create an app
- React Bootstrap: Basis of UI components such as cards, buttons, and navigation bar to avoid having to hardcode CSS files
- Node.js: Used for managing API endpoints in the backend
- Postman: Used to develop API documentation
- GitLab: Used to maintain shared projects, version control, continuous integration pipelines, and issue management
- Google Maps: Used to render a map to display the event location
- AWS: Used for webpage hosting
- Namecheap: Used to find a domain

---

## Hosting
Webpage hosted on AWS using AWS Amplify
Domain name generated from Namecheap

## Architectural Overview

### Landing page for website
- Tools: React, React-Bootstrap, React Router, JavaScript
- The main page where the user can see a summary of the site's mission
- Navigation bar at the top, universal throughout the site, contains links to the Homepage, Events, organizations, and resources model pages, and the about page
- Presents cards to detail the functionality and information found on “Events”, “Resources”, and “Organizations” model pages
- Cards contain a link to each respective model page

### Model Pages for Events, Organizations, and Resources
- Tools: React, React-Bootstrap, React Router, JavaScript
- Contains count of instances of model
- Each model page contains card information stored in an object array
    - Map is called on the object array to render cards
- Card contains a link to the instance page of each object to learn more

### Instance Pages for Events, Organizations, and Resources
- Tools: React, React-Bootstrap, JavaScript, React Router

#### Events: 
- Attributes: event title, location, date, time, event type
- Media: image associated with the event, link to the event page (website online), Google Maps integration to see the location
    - Map view added via Google Maps iframe integration
- Card display of related organizations and resources, linking to their instance pages

#### Organizations
- Attributes: organization name, location, type, services, hours, online availability
- Media: Organization logo, links to organization page
- Card display of related organizations and resources, linking to their instance pages

#### Resources
- Attributes: resource name, location, type, hours, online availability, associated organization name
- Media: Related image, link to resource webpage
- Card display of related organizations and resources, linking to their instance pages

### Pagination
Pagination is accomplished when calling the backend API. The API takes in parameters **per_page** and **page** which indicates the number of items that will be fetched from the database at a time and the page we are beginnning from. By using pagination and keeping the **per_page** value to a minimum, we are able to reduce loading time.

### Sorting and Filtering
Sorting and filtering is accomplished by using query parameters when calling from the backend API. State variables are maintained to keep track of what filters and sorts the user has selected which are then passed into the backend call. The backend then sends data corresponding to the filters and sorts.
- Organizations filter by: type (Health Center, Shelter), Online Availability (All, Yes, No), Services (Healthcare, Outreach, Preventive), Hours (Weekdays, Weekends, Night, 24/7, N/A)
- Organizations sort by: None, Location (State), and Name

- Resources filter by: Type (Medical Assistance, Legal), Online Availability (All, Yes, No), Organization Name (A-F, G-K, L-P, Q-U, V-Z), Hours (Weekdays, Weekends, Night, 24/7, N/A)
- Resources sort by: None, Location (State), and Name

### About Page
- Tools:  React-Bootstrap, JavaScript, GitLab REST API
- Contains the site's mission and target audience
- Contains the significance of the tools used
- Contains links to the repository, Postman, and related websites
- Contains cards for each team member
- Attributes: member name, role, photo, short biography, commits, issues created, issues closed, and unit tests
    - GitLab API Integration to retrieve commits, issues created, issues closed, and unit tests

## Challenges 
- The Google Translate widget initially rendered multiple times due to React's re-renders. However, once we added a script check and conditional initialization, it ensured that the widget only loaded once. 
- We struggled with finding good APIs to source our data. We originally planned to use the 211 API as our primary data source, which would have provided comprehensive social services data. However, our subscription request was not approved in time, forcing us to pivot to alternative APIs. This required adapting our data import scripts to handle varying response formats, API rate limits, and quota restrictions. 
- We struggled with figuring out a way to query from our backend when sorting the location since we grouped by state, however the format of the address varied in formats, for example (city, state), (address, city, state), (address, city, state, zip code), however this was accomplished in the backend by adding a helper method to parse and extract the state from the location
- We also struggled with filtering data in the backend when the filter contained a range, specifically hours of operation, which we used filters of "Weekdays", "Weekends", "Nights", "24/7" for. However, since the hours were formatted in various ways (Mon-Fri 8am-5pm), (Monday: 8 AM-5 PM, Tuesday: 8 AM-5 PM, Wednesday: 8 AM-5 PM, Thursday: 8 AM-5 PM, Friday: 8 AM-5 PM) and various other formats, being able to determine that this operats on "Weekdays" required a helper function in the backend.