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

---

## Database

---

## User Stories

1. As a non-English speaker, I want to toggle the website language, so that I can understand the interface labels and descriptions.
  - We expected this feature to take an hour to implement. By using a Google Translate script, we were able to add a "select language" button that translates our site. It took about 2 hours to incorporate.
2. As a survivor looking for the most relevant help, I want to filter resources by multiple criteria (e.g., location, type of service, and language), so that I can quickly find tailored resources that match my needs.
  - This is a feature that will be implemented in phase 3 when filtering is supported.
3. As a survivor researching a specific organization or event, I want to click on a card to view its detailed instance page, so that I can learn more, view media, and follow related links. 
  - We have implemented clickable cards for each model that lead to detailed instance pages. On the instance pages there is information and related external links. We estimated this taking an hour and it took about an hour per page.
4. As a user browsing hundreds of resources, I want to see data displayed in smaller, paginated sections, so that I can easily navigate without long loading times.
  - We have implemented pagination within each of the model pages for events, resources, and organizations so that users can see the number of cards presented (total number of pages). We estimated this to take an hour, and it took a bit over an hour to figure out how to implement pagination for the first model (events page). Challenges arose in ensuring the math was correct, however once implemented we were able to easily implement it in the resources and organization model pages.
5. As a user relying on assistive technology, I want to navigate the site easily, so that it’s inclusive, fast, and mobile-friendly. (like Lighthouse score ≥ 90 for performance and accessibility or Meets WCAG AA standards)
  - We ensured that the webpage is accessable by adding alt text to any images on the website, as well as improving the color contrast to be within WCAG AA standards. Challenges arose to meet lighthouse performance and accessability scores of ≥ 90. We used the google chrome developer tools to find specific points of danger such as the presence of unused javascript or latency from how we fetch data.
6. 
7. 
8. 
9. 
10. 

---

## Data Scraping

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
- **Attributes:** Organization name, location, services, times, online availability, target demographic  
- **Media:** Organization logo  
- **Related cards:** Related resources and events

### Resources
- **Attributes:** Resource name, location, type, hours, online availability, organization name  
- **Media:** Resource image/logo, map or link  
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
- Attributes: organization name, location, services, times, online availability, and target demographic
- Media: Organization logo, links to organization page
- Card display of related organizations and resources, linking to their instance pages

#### Resources
- Attributes: resource name, location, type, hours, online availability, organization name
- Media: Resource image/logo, map of location or link to resource if online
    - Map view added via Google Maps iframe integration
- Card display of related organizations and resources, linking to their instance pages

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