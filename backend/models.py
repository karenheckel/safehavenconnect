from flask_sqlalchemy import SQLAlchemy
from datetime import datetime

db = SQLAlchemy()

organization_resources = db.Table('organization_resources',
    db.Column('organization_id', db.Integer, db.ForeignKey('organizations.id'), primary_key=True),
    db.Column('resource_id', db.Integer, db.ForeignKey('resources.id'), primary_key=True)
)

organization_events = db.Table('organization_events',
    db.Column('organization_id', db.Integer, db.ForeignKey('organizations.id'), primary_key=True),
    db.Column('event_id', db.Integer, db.ForeignKey('events.id'), primary_key=True)
)

resource_events = db.Table('resource_events',
    db.Column('resource_id', db.Integer, db.ForeignKey('resources.id'), primary_key=True),
    db.Column('event_id', db.Integer, db.ForeignKey('events.id'), primary_key=True)
)


class Organization(db.Model):
    __tablename__ = 'organizations'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255), nullable=False)
    capacity = db.Column(db.Integer)
    services = db.Column(db.Text)
    online_availability = db.Column(db.Boolean, default=False)
    organization_type = db.Column(db.String(100))
    
    image_url = db.Column(db.String(500))
    website_url = db.Column(db.String(500))
    description = db.Column(db.Text)
    hours_of_operation = db.Column(db.Text)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    resources = db.relationship('Resource', secondary=organization_resources, 
                               back_populates='organizations', lazy='dynamic')
    events = db.relationship('Event', secondary=organization_events, 
                            back_populates='organizations', lazy='dynamic')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'capacity': self.capacity,
            'services': self.services,
            'online_availability': self.online_availability,
            'organization_type': self.organization_type,
            'image_url': self.image_url,
            'website_url': self.website_url,
            'description': self.description,
            'hours_of_operation': self.hours_of_operation,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'resource_ids': [r.id for r in self.resources],
            'event_ids': [e.id for e in self.events]
        }


class Resource(db.Model):
    __tablename__ = 'resources'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    title = db.Column(db.String(255), nullable=False)
    organization_name = db.Column(db.String(255))
    services = db.Column(db.Text)
    eligibility = db.Column(db.Text)
    languages_supported = db.Column(db.String(255))
    location = db.Column(db.String(255))
    topic = db.Column(db.String(100))
    online_availability = db.Column(db.Boolean, default=False)
    hours_of_operation = db.Column(db.Text)
    category = db.Column(db.String(64))
    
    resource_url = db.Column(db.String(500))
    image_url = db.Column(db.String(500))
    description = db.Column(db.Text)
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    organizations = db.relationship('Organization', secondary=organization_resources, 
                                   back_populates='resources', lazy='dynamic')
    events = db.relationship('Event', secondary=resource_events, 
                            back_populates='resources', lazy='dynamic')
    
    def to_dict(self):
        return {
            'id': self.id,
            'title': self.title,
            'organization_name': self.organization_name,
            'services': self.services,
            'eligibility': self.eligibility,
            'languages_supported': self.languages_supported,
            'location': self.location,
            'topic': self.topic,
            'online_availability': self.online_availability,
            'hours_of_operation': self.hours_of_operation,
            'resource_url': self.resource_url,
            'image_url': self.image_url,
            'description': self.description,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'organization_ids': [o.id for o in self.organizations],
            'event_ids': [e.id for e in self.events]
        }


class Event(db.Model):
    __tablename__ = 'events'
    
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    
    name = db.Column(db.String(255), nullable=False)
    location = db.Column(db.String(255))
    start_time = db.Column(db.DateTime)
    end_time = db.Column(db.DateTime)
    date = db.Column(db.Date)
    duration = db.Column(db.Integer)
    event_type = db.Column(db.String(100))
    is_online = db.Column(db.Boolean, default=False)
    registration_open = db.Column(db.Boolean, default=True)
    
    event_url = db.Column(db.String(500))
    image_url = db.Column(db.String(500))
    description = db.Column(db.Text)
    map_url = db.Column(db.String(500))
    
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    updated_at = db.Column(db.DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    
    organizations = db.relationship('Organization', secondary=organization_events, 
                                   back_populates='events', lazy='dynamic')
    resources = db.relationship('Resource', secondary=resource_events, 
                               back_populates='events', lazy='dynamic')
    
    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'location': self.location,
            'start_time': self.start_time.isoformat() if self.start_time else None,
            'end_time': self.end_time.isoformat() if self.end_time else None,
            'date': self.date.isoformat() if self.date else None,
            'duration': (int((self.end_time - self.start_time).total_seconds() // 60) if self.start_time and self.end_time else None),
            'event_type': self.event_type,
            'is_online': self.is_online,
            'registration_open': self.registration_open,
            'event_url': self.event_url,
            'image_url': self.image_url,
            'description': self.description,
            'map_url': self.map_url,
            'created_at': self.created_at.isoformat() if self.created_at else None,
            'updated_at': self.updated_at.isoformat() if self.updated_at else None,
            'organization_ids': [o.id for o in self.organizations],
            'resource_ids': [r.id for r in self.resources]
        }

