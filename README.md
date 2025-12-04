# SafeHavenConnect 

## Canvas / Slack group number 
55085_03

## Team Members
| Member | EID | GitLab ID |
| ------ | ------ | ------ |
| **Brianna Flores** | bf9566 | @Brianna-Flo |
| **Jonathan Ho** | jh77773 | @jnthnho |
| **Karen Heckel** | kh38298 | @karenheckel |
| **Parul Sadasivuni** | pss2326 | @parul.sadasivuni |

## The Proposed Project
Our project will be a platform that organizes and provides domestic violence resources to those struggling to find reliable, accessible, and local resources for safety, legal/medical/financial aid, and support events.

## Link to website
https://safehavenconnect.me/

## Link to GitLab pipelines
https://gitlab.com/parul.sadasivuni/cs373-fall-2025-55085_03/-/pipelines

## Link to backend API
https://backend.safehavenconnect.me

## Link to API Documentation
https://documenter.getpostman.com/view/48794305/2sB3WjzjPd


## Phase 1 
- Project Leader: Brianna Flores
- Initiated the project, delegated tasks to team members, and ensured everyone completed their responsibilities on time. 

#### Phase 1 Git SHA
c41cd3f3bb0dbd6ff0be8c739fd6da431484b446

#### Phase 1 Estimated and Actual Completion Time
| Member | Estimated (hours) | Actual (hours) |
| ------ | ------ | ------ |
| **Brianna Flores** | 15 | 18 |
| **Jonathan Ho** | 16 | 10 |
| **Karen Heckel** | 15 | 17 |
| **Parul Sadasivuni** | 20 | 12 |


## Phase 2 
- Project Leader: Karen Heckel
- Divided up work and made sure everyone stayed on track, asking for updates when needed.

#### Phase 2 Git SHA
We ran out of Gitlab compute minutes at the very end, so our pipeline started failing.
d9b3a8045622f3853ceb405b7002073ba38c79b9


#### Phase 2 Estimated and Actual Completion Time
| Member | Estimated (hours) | Actual (hours) |
| ------ | ------ | ------ |
| **Brianna Flores** | 15 | 22 |
| **Jonathan Ho** | 15 | 35 |
| **Karen Heckel** | 15 | 30 |
| **Parul Sadasivuni** | 15 | 20 |


## Phase 3
- Project Leader: Parul Sadasivuni
- Led group meetings, made sure tasks were completed, and kept team on task.

#### Phase 3 Git SHA
be23c02abccc9da48f1b5c94c412b63445c4cb75

#### Phase 3 Estimated and Actual Completion Time
| Member | Estimated (hours) | Actual (hours) |
| ------ | ------ | ------ |
| **Brianna Flores** | 8 | 16 |
| **Jonathan Ho** | 10 | 13 |
| **Karen Heckel** | 15 | 20 |
| **Parul Sadasivuni** | 15 | 12 |


## Phase 4
- Project Leader: Jonathan Ho
- 

#### Phase 4 Git SHA: 098128c5


#### Phase 4 Estimated and Actual Completion Time
| Member | Estimated (hours) | Actual (hours) |
| ------ | ------ | ------ |
| **Brianna Flores** | 4 | 8 |
| **Jonathan Ho** | 3 | 4 |
| **Karen Heckel** | 5 | 10 |
| **Parul Sadasivuni** | 3 | 4 |


## Data sources 
- https://apiportal.211.org/ - 211 National Data Platform (we can use this to find information on programs, hotlines, services) [Organizations and Resources]
- https://topapis.com/homeless-shelter-api/ - Homeless Shelter API (helpful to find information on shelters) [Resources]
- https://eventbrite.com - Events held across the US (online and in-person) [Events]
- https://data.hrsa.gov/tools/web-services - Medical centers API (use to find medical centers)

## Models
1. Organizations
2. Resources
3. Events

## Number of instances of each model
1. Organizations: 20
2. Resources: 50
3. Events: 50

## Five Attributes per Model
1. Organizations: location, capacity, services, online availability, type of organization
2. Resources: org name, services (includes medical services nearby, education, financial aid, legal assistance), eligibility, languages supported, location, topic
3. Events: name, location, start time, date, duration, type of event, in person/online, registration open

## Instances of each model must connect to instances of at least two other models

**Organizations**
- Connect to resources: any resources put out by the organization
- Any events held by the organization

**Resources**
- Connect to organizations that are referenced by resources
- Connect to events related to the resource article

**Events**
- Connect to resources event may be promoting
- Connect to organization that is
 hosting event

## Describe two types of media for each model

**Organizations:** Link to organization, image of organization, text describing organization

**Resources:** link to resource, text, images

**Events:** link to event page, images of event, map for event location, countdown till event start

## Questions that our site will answer
1. Where is the nearest domestic violence shelter and what services do they offer?
2. What free or affordable legal resources can I access based on my situation?
3. What upcoming events, workshops, or support groups are available for survivors in my area or online?
