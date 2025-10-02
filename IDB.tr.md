# SafeHavenConnect Technical Report

---


## Purpose/Motivation
SafeHavenConnect is a platform designed to help individuals struggling to find trustworthy, accessible, and local resources for safety, legal, medical, financial, and community support. Our goal is to connect users with verified organizations and events while providing a platform that empowers them to take the next steps toward safety and recovery.

---

## User Stories
User stories were provided at 10:30 PM the day the project was due. We are working to discuss and refine the user stories’ scope and definition.
**User Story #1: Finding a Nearby Shelter**
As a survivor seeking safety, I want to find the nearest domestic violence shelter so that I can access immediate help. I want to see what services they offer and their capacity. This will allow me to quickly make informed decisions about where to go in an emergency. 

**User Story #2: Accessing Legal Resources**
As a user looking for legal aid, I want to browse free or low-cost legal resources so that I can understand my rights and options. I want to filter resources based on my specific situation and eligibility. This will help me navigate the legal process with confidence and safety. 

**User Story #3: Discovering Support Events**
As a survivor seeking community support, I want to find upcoming workshops, support groups, and events near me or online. I want to see event details like date, location, duration, and registration availability. This will allow me to participate in helpful programs and connect with others in similar situations. 

**User Story #4: Exploring Organization Services**
As a user looking for comprehensive support, I want to explore organizations that provide multiple services like medical care, counseling, and financial aid. I want to see images, links, and descriptions of these organizations. This will help me choose the most suitable organization for my specific needs. 

**User Story #5: Multilingual Resource Access**
As a non-English speaker, I want to filter resources and organizations by languages supported so that I can find help in a language I understand. I want to see which services are available in my preferred language. This will ensure I can access critical information without communication barriers. 


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
- The biggest challenge was beginning the project, such as figuring out a framework to use, how to approach the problem, and how to organize the website with no strict guidelines. We decided to utilize React and React-Bootstrap as per the suggestion and collaborated to determine how best to go about organizing the site.