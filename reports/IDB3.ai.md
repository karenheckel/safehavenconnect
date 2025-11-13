# AI Report (IDB.ai.md)

## Summary of AI Interactions

### Tools Used

Copilot\\
Claude Sonnet 4.5\\
GPT-5 Pro

### Categories of AI Assistance

#### 1. Debugging Help

- [ ] Finding location of bugs and understanding what caused the error to be avoided in the future

**Example:**
I had no previous experience working with the backend database within the app.py file, so being able to understand where the bug was when implementing pagination for the organizations end point first allowed me to identify the bug and understand exactly why the bug persisted. Since I used the same logic in the event and resource pagination this avoided the bug from appearing there. As well, since the logic was somewhat similar when querying filtered and sorted data, the bug was as well avoided in that scenario.

---

#### 2. Conceptual Clarification

- [ ] Clarification with understanding how GitLab deploying functions and allowing all members to deploy

**Example:**
ChatGPT explained how permissions worked within GitLab and enabled any team member to deploy the backend of the website ensuring that the frontend and backend code were updated.

As well, we previously had an issue with running out of credits which caused our pipeline to fail, so reguarding that we wre suggested to use the [skip ci] phrase within the commit messages to avoid automaticaly running the pipeline and limit our usage of credits

---

#### 3. Code Improvement

- [ ] I used AI to improve the reusability of code.

**Example:**
Helped me identify within the app.py file that there was similar logic that could be safely extracted into a helper function that can be called multiple times rather than repeating large messy blocks of code within each models the GET endpoint.

---

#### 4. Alternative Approaches

- [ ] Asked "is there a simpler way?"
- Understanding tradeoffs between sorting and filtering in the frontend vs querying from the backend

**Example:**
I discussed and understood the tradeoffs between sorting/filtering in the frontend which is what I had initially done prior to adding the backend endpoint which took in query parameters for pagination as well as the filters or sorting that the user requested. When doing it in the frontend it was inefficient and required time loading versus in the backend I had to translate my sorting/filtering functions into python within the app.py file

---

## Reflection on Use

### What specific improvements to your code or understanding came from this AI interaction?

Helped me mostly to understand CI/CD as well as how to handle adding AWS variables into GitLab. Furthermore, it guided me through the entire AWS sign up process and IAM role configuration.

---

### How did you decide what to keep or ignore from the AI's suggestions?

At times the AI's suggestions would be somewhat overkill since they were under the assumption that we were unable to create our own endpoints and modify the backend, so if the AI used the full no parameter queries, I would ignore the suggestion and opt for using the query parameters that we implemented.

---

### Did the AI ever produce an incorrect or misleading suggestion? How did you detect that?

Yes, it did. At times when it was suggesting ways to implement filtering in the backend, it did not have the context for the type of database we were using, so the idea on how to sort was correct, however it was not applicable to our backend which uses PostgreSQL 15 (alpine) with SQLAlchemy

---

## Evidence of Independent Work

### Code Change Example

**Before (AI suggestion):**

```javascript
const checkOrgInRange = (org, range) => {
    if (!org || org.length === 0) 
        return false
    const [start, end] = range.split("-")
    return org[0].toUpperCase() >= start && org[0].toUpperCase() <= end
}
```

**After (Your modification):**
```python
    def check_org_in_range(range_str, column):
        if not range_str or "-" not in range_str:
            return None
        start, end = range_str.split("-")
        start, end = start.upper(), end.upper()
        return func.upper(func.substr(column, 1, 1)).between(start, end)
```

**What I learned:**

I learned that in order to effectively implement filtering by organization name (alphabetically) I would need to do it in the backend in order to optimize it. Originally this was done in the frontend however it resulted in excess loading time since they would need to fetch all resources, then filter them based on their organization name, then populate it. 

---

## Integrity Statement

**"I confirm that the AI was used only as a helper (explainer, debugger, reviewer) and not as a code generator. All code submitted is my own work."**

**Date:** November 12, 2025

---
