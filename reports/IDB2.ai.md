# AI Report (IDB.ai.md)

## Summary of AI Interactions

### Tools Used
Anthropic Claude Opus 4.1
GPT-5 Pro

### Categories of AI Assistance

#### 1. Debugging Help
- [ ] Bug location

**Example:**
When I had trouble with the pipeline failing, I was able to understand what caused it through Claude.

---

#### 2. Conceptual Clarification
- [ ] Computer Science concepts

**Example:**
It was my first time using AWS so I was able to understand how to handle it on GitLab. Used it to create documentation and requirements.

---

#### 3. Code Improvement
- [ ] Style improvements

**Example:**
Helped me structure my documentation and commentary.

---

#### 4. Alternative Approaches
- [ ] Asked "is there a simpler way?"
- [ ] Explored different implementation patterns

**Example:**
Found simplest way to store user session times.

---

#### 5. Other
**Example:**
Helped catch spelling mistakes and typos in documentation.

---

## Reflection on Use

### What specific improvements to your code or understanding came from this AI interaction?

Helped me mostly to understand CI/CD as well as how to handle adding AWS variables into GitLab. Furthermore, it guided me through the entire AWS sign up process and IAM role configuration.

---

### How did you decide what to keep or ignore from the AI's suggestions?

By verifying with another LLM that it was correct, using cross verification between deep thinking models to ensure accuracy.

---

### Did the AI ever produce an incorrect or misleading suggestion? How did you detect that?

Not with my approach.

---

## Evidence of Independent Work

### Code Change Example 1

**Before (AI suggestion):**
```python
# Simple error handling
@app.route('/api/organizations', methods=['GET'])
def get_organizations():
    orgs = Organization.query.all()
    return jsonify([org.to_dict() for org in orgs])
```

**After (Your modification):**
```python
# Added proper error handling and filtering
@app.route('/api/organizations', methods=['GET'])
def get_organizations():
    try:
        orgs = Organization.query.all()
        return jsonify([org.to_dict() for org in orgs]), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
```

**What I learned:**

I learnt about the error handling needed with api calls.

---

### Code Change Example 2

**Before (AI suggestion):**
```python
# Basic database model
class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(255))
    location = db.Column(db.String(255))
```

**After (Your modification):**
```python
# Added relationships and timestamps
class Organization(db.Model):
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    resources = db.relationship('Resource', secondary=organization_resources)
```

**What I learned:**

By implementing many-to-many relationships in SQLAlchemy, I learned how models connect through association tables to keep data linked consistently across the database. I realized how important timestamps are for tracking when records are created or updated. This change made the data model much more scalable.

---

## Integrity Statement

**"I confirm that the AI was used only as a helper (explainer, debugger, reviewer) and not as a code generator. All code submitted is my own work."**

**Date:** October 21, 2025

---
