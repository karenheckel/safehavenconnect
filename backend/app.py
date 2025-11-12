from flask import Flask, jsonify, request, abort
from flask_cors import CORS
from config import config
from models import db, Organization, Resource, Event
import os, re
from sqlalchemy import inspect, text, or_, func, and_
from datetime import datetime, date, timedelta
from utils import get_image_for_topic


def parse_datetime(value):
    if not value:
        return None
    try:
        return datetime.fromisoformat(value)
    except Exception:
        return None


def parse_date(value):
    if not value:
        return None
    try:
        return date.fromisoformat(value)
    except Exception:
        return None


def ensure_columns():
    eng = db.engine
    insp = inspect(eng)
    tables = {}
    for t in ['events', 'organizations', 'resources']:
        try:
            if insp.has_table(t):
                tables[t] = {c['name'] for c in insp.get_columns(t)}
        except Exception:
            pass
    conn = eng.connect()
    try:
        if 'events' in tables and 'end_time' not in tables['events']:
            if eng.name == 'postgresql':
                conn.execute(text('ALTER TABLE events ADD COLUMN end_time TIMESTAMP NULL'))
            else:
                conn.execute(text('ALTER TABLE events ADD COLUMN end_time TIMESTAMP'))
        if 'organizations' in tables and 'hours_of_operation' not in tables['organizations']:
            conn.execute(text('ALTER TABLE organizations ADD COLUMN hours_of_operation TEXT'))
        if 'resources' in tables:
            if 'online_availability' not in tables['resources']:
                if eng.name == 'postgresql':
                    conn.execute(text('ALTER TABLE resources ADD COLUMN online_availability BOOLEAN'))
                else:
                    conn.execute(text('ALTER TABLE resources ADD COLUMN online_availability BOOLEAN'))
            if 'hours_of_operation' not in tables['resources']:
                conn.execute(text('ALTER TABLE resources ADD COLUMN hours_of_operation TEXT'))
        conn.commit()
    finally:
        conn.close()


def backfill_events_end_time():
    try:
        missing = Event.query.filter(Event.end_time.is_(None), Event.start_time.isnot(None), Event.duration.isnot(None)).all()
        updated = 0
        for e in missing:
            try:
                e.end_time = e.start_time + timedelta(minutes=int(e.duration))
                updated += 1
            except Exception:
                pass
        if updated:
            db.session.commit()
    except Exception:
        db.session.rollback()


def _get_or_404(model, obj_id):
    """SQLAlchemy 2.0-safe loader to replace legacy Query.get_or_404.
    Uses Session.get and aborts with 404 if not found.
    """
    obj = db.session.get(model, obj_id)
    if obj is None:
        abort(404)
    return obj


def create_app(config_name='default', testing=False):
    app = Flask(__name__)
    
    if testing:
        app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///:memory:'
        app.config['TESTING'] = True
    else:
        app.config.from_object(config[config_name])
    
    db.init_app(app)
    CORS(app)
    
    run_schema_setup = os.environ.get("EAGER_SCHEMA_INIT", "").lower() in ("1", "true", "yes")
    if app.debug or run_schema_setup:
        with app.app_context():
            try:
                db.create_all()
                ensure_columns()
                backfill_events_end_time()
            except Exception:
                pass
    
    @app.route('/api/organizations', methods=['GET'])
    def get_organizations():
        try:
            location = request.args.get('location')
            org_type = request.args.getlist('type')
            online = request.args.get('online')
            services = request.args.getlist('services')
            hours = request.args.getlist('hours')
            sort = request.args.get('sort', default='none')
            page = request.args.get('page', default=1, type=int)
            per_page = request.args.get('per_page', default=10, type=int)
            
            query = Organization.query
            
            if location:
                query = query.filter(Organization.location.ilike(f'%{location}%'))
            if org_type and len(org_type) > 0:
                query = query.filter(
                    or_(*[Organization.organization_type.ilike(f"%{t}%") for t in org_type])
                )
            if online is not None and online != "":
                query = query.filter(Organization.online_availability == (online.lower() == 'true'))
            if services and len(services) > 0:
                query = query.filter(
                    or_(*[Organization.services.ilike(f"%{s}%") for s in services])
                )
            if hours and len(hours) > 0:
                hour_filters = []
                for h in hours:
                    h_lower = h.lower()

                    if h_lower == "24/7":
                        hour_filters.append(
                            or_(
                                Organization.hours_of_operation.ilike("%24/7%"),
                                Organization.hours_of_operation.ilike("%24 hours%"),
                                Organization.hours_of_operation.ilike("%24 hr%")
                            )
                        )
                    elif h_lower == "weekdays":
                        hour_filters.append(
                            or_(
                                Organization.hours_of_operation.ilike("%mon%"),
                                Organization.hours_of_operation.ilike("%tue%"),
                                Organization.hours_of_operation.ilike("%wed%"),
                                Organization.hours_of_operation.ilike("%thu%"),
                                Organization.hours_of_operation.ilike("%fri%")
                            )
                        )
                    elif h_lower == "weekends":
                        hour_filters.append(
                            or_(
                                Organization.hours_of_operation.ilike("%sat%"),
                                Organization.hours_of_operation.ilike("%sun%")
                            )
                        )
                    elif h_lower == "night":
                        hour_filters.append(
                            or_(
                                Organization.hours_of_operation.ilike("%8pm%"),
                                Organization.hours_of_operation.ilike("%9pm%"),
                                Organization.hours_of_operation.ilike("%10pm%"),
                                Organization.hours_of_operation.ilike("%11pm%"),
                                Organization.hours_of_operation.ilike("%12am%"),
                                Organization.hours_of_operation.ilike("%1am%"),
                                Organization.hours_of_operation.ilike("%2am%"),
                                Organization.hours_of_operation.ilike("%3am%"),
                                Organization.hours_of_operation.ilike("%4am%"),
                                Organization.hours_of_operation.ilike("%5am%")
                            )
                        )
                    elif h_lower == "n/a":
                        hour_filters.append(
                            Organization.hours_of_operation.ilike("%n/a%")
                        )

                if hour_filters:
                    query = query.filter(or_(*hour_filters))
            if sort == "state":
                query = query.order_by(func.split_part(Organization.location, ', ', 2).asc())
            elif sort == "name":
                query = query.order_by(Organization.name.asc())
            
            paginated = query.paginate(page=page, per_page=per_page, error_out=False)

            organizations = [org.to_dict() for org in paginated.items]
            return jsonify({
                "data": organizations,
                "pagination": {
                    "total": paginated.total,
                    "page": paginated.page,
                    "per_page": paginated.per_page,
                    "pages": paginated.pages,
                    "has_next": paginated.has_next,
                    "has_prev": paginated.has_prev
                }
            }), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/organizations/<int:org_id>', methods=['GET'])
    def get_organization(org_id):
        try:
            organization = _get_or_404(Organization, org_id)
            return jsonify(organization.to_dict()), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 404
    
    @app.route('/api/organizations', methods=['POST'])
    def create_organization():
        try:
            data = request.get_json()
            
            organization = Organization(
                name=data.get('name'),
                location=data.get('location'),
                capacity=data.get('capacity'),
                services=data.get('services'),
                online_availability=data.get('online_availability', False),
                organization_type=data.get('organization_type'),
                image_url=data.get('image_url'),
                website_url=data.get('website_url'),
                description=data.get('description'),
                hours_of_operation=data.get('hours_of_operation')
            )
            
            db.session.add(organization)
            db.session.commit()
            
            return jsonify(organization.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
    
    @app.route('/api/organizations/<int:org_id>', methods=['PUT'])
    def update_organization(org_id):
        try:
            organization = _get_or_404(Organization, org_id)
            data = request.get_json()
            
            for key, value in data.items():
                if hasattr(organization, key):
                    setattr(organization, key, value)
            
            db.session.commit()
            return jsonify(organization.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
    
    @app.route('/api/organizations/<int:org_id>', methods=['DELETE'])
    def delete_organization(org_id):
        try:
            organization = _get_or_404(Organization, org_id)
            db.session.delete(organization)
            db.session.commit()
            return jsonify({'message': 'Organization deleted successfully'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
    
    def check_org_in_range(range_str, column):
        if not range_str or "-" not in range_str:
            return None
        start, end = range_str.split("-")
        start, end = start.upper(), end.upper()
        return func.upper(func.substr(column, 1, 1)).between(start, end)


    @app.route('/api/resources', methods=['GET'])
    def get_resources():
        try:
            location = request.args.get('location')
            type = request.args.getlist('type')
            orgs = request.args.getlist('orgs')
            online = request.args.get('online')
            hours = request.args.getlist('hours')
            sort = request.args.get('sort', default='none')
            page = request.args.get('page', default=1, type=int)
            per_page = request.args.get('per_page', default=10, type=int)

            query = Resource.query
            
            if location:
                query = query.filter(Resource.location.ilike(f'%{location}%'))
            if type and len(type) > 0:
                query = query.filter(
                    or_(*[Resource.topic.ilike(f'%{t}%') for t in type])
                )
            if orgs:
                org_filters = []
                for r in orgs:
                    range_filter = check_org_in_range(r, Resource.organization_name)
                    if range_filter is not None:
                        org_filters.append(range_filter)
                if org_filters:
                    query = query.filter(or_(*org_filters))
            if online is not None:
                query = query.filter(Resource.online_availability == (online.lower() == 'true'))
            
            if hours and len(hours) > 0:
                hour_filters = []
                for h in hours:
                    h_lower = h.lower()

                    if h_lower == "24/7":
                        hour_filters.append(
                            or_(
                                Resource.hours_of_operation.ilike("%24/7%"),
                                Resource.hours_of_operation.ilike("%24 hours%"),
                                Resource.hours_of_operation.ilike("%24 hr%")
                            )
                        )
                    elif h_lower == "weekdays":
                        hour_filters.append(
                            or_(
                                Resource.hours_of_operation.ilike("%mon%"),
                                Resource.hours_of_operation.ilike("%tue%"),
                                Resource.hours_of_operation.ilike("%wed%"),
                                Resource.hours_of_operation.ilike("%thu%"),
                                Resource.hours_of_operation.ilike("%fri%")
                            )
                        )
                    elif h_lower == "weekends":
                        hour_filters.append(
                            or_(
                                Resource.hours_of_operation.ilike("%sat%"),
                                Resource.hours_of_operation.ilike("%sun%")
                            )
                        )
                    elif h_lower == "night":
                        hour_filters.append(
                            or_(
                                Resource.hours_of_operation.ilike("%8pm%"),
                                Resource.hours_of_operation.ilike("%9pm%"),
                                Resource.hours_of_operation.ilike("%10pm%"),
                                Resource.hours_of_operation.ilike("%11pm%"),
                                Resource.hours_of_operation.ilike("%12am%"),
                                Resource.hours_of_operation.ilike("%1am%"),
                                Resource.hours_of_operation.ilike("%2am%"),
                                Resource.hours_of_operation.ilike("%3am%"),
                                Resource.hours_of_operation.ilike("%4am%"),
                                Resource.hours_of_operation.ilike("%5am%")
                            )
                        )
                    elif h_lower == "n/a":
                        hour_filters.append(
                            Resource.hours_of_operation.ilike("%n/a%")
                        )

                if hour_filters:
                    query = query.filter(or_(*hour_filters))

            if sort == "state":
                query = query.order_by(func.trim(func.split_part(Resource.location, ',', -1)))
            elif sort == "name":
                query = query.order_by(Resource.title.asc())
            

            

            paginated = query.paginate(page=page, per_page=per_page, error_out=False)

            resources = [resource.to_dict() for resource in paginated.items]
            return jsonify({
                "data": resources,
                "pagination": {
                    "total": paginated.total,
                    "page": paginated.page,
                    "per_page": paginated.per_page,
                    "pages": paginated.pages,
                    "has_next": paginated.has_next,
                    "has_prev": paginated.has_prev
                }
            }), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/resources/<int:resource_id>', methods=['GET'])
    def get_resource(resource_id):
        try:
            resource = _get_or_404(Resource, resource_id)
            return jsonify(resource.to_dict()), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 404
    
    @app.route('/api/resources', methods=['POST'])
    def create_resource():
        try:
            data = request.get_json()
            
            resource = Resource(
                title=data.get('title'),
                organization_name=data.get('organization_name'),
                services=data.get('services'),
                eligibility=data.get('eligibility'),
                languages_supported=data.get('languages_supported'),
                location=data.get('location'),
                topic=data.get('topic'),
                online_availability=data.get('online_availability', False),
                hours_of_operation=data.get('hours_of_operation'),
                resource_url=data.get('resource_url'),
                image_url=data.get('image_url'),
                description=data.get('description')
            )
            
            db.session.add(resource)
            db.session.commit()
            
            return jsonify(resource.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
    
    @app.route('/api/resources/<int:resource_id>', methods=['PUT'])
    def update_resource(resource_id):
        try:
            resource = _get_or_404(Resource, resource_id)
            data = request.get_json()
            
            for key, value in data.items():
                if hasattr(resource, key):
                    setattr(resource, key, value)
            
            db.session.commit()
            return jsonify(resource.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
    
    @app.route('/api/resources/<int:resource_id>', methods=['DELETE'])
    def delete_resource(resource_id):
        try:
            resource = _get_or_404(Resource, resource_id)
            db.session.delete(resource)
            db.session.commit()
            return jsonify({'message': 'Resource deleted successfully'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
    
    @app.route('/api/events', methods=['GET'])
    def get_events():
        try:
            event_type = request.args.get('type')
            location = request.args.get('location')
            online = request.args.get('online')
            registration_open = request.args.get('registration_open')
            page = request.args.get('page', default=1, type=int)
            per_page = request.args.get('per_page', default=10, type=int)
            
            query = Event.query
            
            if event_type:
                query = query.filter(Event.event_type == event_type)
            if location:
                query = query.filter(Event.location.ilike(f'%{location}%'))
            if online is not None:
                query = query.filter(Event.is_online == (online.lower() == 'true'))
            if registration_open is not None:
                query = query.filter(Event.registration_open == (registration_open.lower() == 'true'))
            
            paginated = query.paginate(page=page, per_page=per_page, error_out=False)

            events = [event.to_dict() for event in paginated.items]
            return jsonify({
                "data": events,
                "pagination": {
                    "total": paginated.total,
                    "page": paginated.page,
                    "per_page": paginated.per_page,
                    "pages": paginated.pages,
                    "has_next": paginated.has_next,
                    "has_prev": paginated.has_prev
                }
            }), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 500
    
    @app.route('/api/events/<int:event_id>', methods=['GET'])
    def get_event(event_id):
        try:
            event = _get_or_404(Event, event_id)
            return jsonify(event.to_dict()), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 404
    
    @app.route('/api/events', methods=['POST'])
    def create_event():
        try:
            data = request.get_json()
            start_time = parse_datetime(data.get('start_time'))
            end_time = parse_datetime(data.get('end_time'))
            d = data.get('duration')
            if end_time is None and start_time is not None and d is not None:
                try:
                    end_time = start_time + timedelta(minutes=int(d))
                except Exception:
                    end_time = None
            event_date = parse_date(data.get('date'))
            duration_minutes = None
            if start_time and end_time:
                try:
                    duration_minutes = int((end_time - start_time).total_seconds() // 60)
                except Exception:
                    duration_minutes = None
            elif d is not None:
                try:
                    duration_minutes = int(d)
                except Exception:
                    duration_minutes = None

            event = Event(
                name=data.get('name'),
                location=data.get('location'),
                start_time=start_time,
                end_time=end_time,
                date=event_date,
                duration=duration_minutes,
                event_type=data.get('event_type'),
                is_online=data.get('is_online', False),
                registration_open=data.get('registration_open', True),
                event_url=data.get('event_url'),
                image_url=data.get('image_url'),
                description=data.get('description'),
                map_url=data.get('map_url')
            )
            
            db.session.add(event)
            db.session.commit()
            
            return jsonify(event.to_dict()), 201
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
    
    @app.route('/api/events/<int:event_id>', methods=['PUT'])
    def update_event(event_id):
        try:
            event = _get_or_404(Event, event_id)
            data = request.get_json()
            if 'start_time' in data:
                event.start_time = parse_datetime(data.get('start_time'))
            if 'end_time' in data:
                event.end_time = parse_datetime(data.get('end_time'))
            if 'date' in data:
                event.date = parse_date(data.get('date'))
            if 'duration' in data and (('end_time' not in data) or not data.get('end_time')) and event.start_time:
                try:
                    event.end_time = event.start_time + timedelta(minutes=int(data.get('duration')))
                    event.duration = int(data.get('duration'))
                except Exception:
                    pass
            for key in ['name', 'location', 'event_type', 'is_online', 'registration_open', 'event_url', 'image_url', 'description', 'map_url']:
                if key in data:
                    setattr(event, key, data.get(key))
            
            db.session.commit()
            return jsonify(event.to_dict()), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
    
    @app.route('/api/events/<int:event_id>', methods=['DELETE'])
    def delete_event(event_id):
        try:
            event = _get_or_404(Event, event_id)
            db.session.delete(event)
            db.session.commit()
            return jsonify({'message': 'Event deleted successfully'}), 200
        except Exception as e:
            db.session.rollback()
            return jsonify({'error': str(e)}), 400
    
    @app.route('/api/organizations/<int:org_id>/resources', methods=['GET'])
    def get_organization_resources(org_id):
        try:
            organization = _get_or_404(Organization, org_id)
            resources = organization.resources.all()
            return jsonify([resource.to_dict() for resource in resources]), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 404
    
    @app.route('/api/organizations/<int:org_id>/events', methods=['GET'])
    def get_organization_events(org_id):
        try:
            organization = _get_or_404(Organization, org_id)
            events = organization.events.all()
            return jsonify([event.to_dict() for event in events]), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 404
    
    @app.route('/api/resources/<int:resource_id>/organizations', methods=['GET'])
    def get_resource_organizations(resource_id):
        try:
            resource = _get_or_404(Resource, resource_id)
            organizations = resource.organizations.all()
            return jsonify([org.to_dict() for org in organizations]), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 404
    
    @app.route('/api/resources/<int:resource_id>/events', methods=['GET'])
    def get_resource_events(resource_id):
        try:
            resource = _get_or_404(Resource, resource_id)
            events = resource.events.all()
            return jsonify([event.to_dict() for event in events]), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 404
    
    @app.route('/api/events/<int:event_id>/organizations', methods=['GET'])
    def get_event_organizations(event_id):
        try:
            event = _get_or_404(Event, event_id)
            organizations = event.organizations.all()
            return jsonify([org.to_dict() for org in organizations]), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 404
    
    @app.route('/api/events/<int:event_id>/resources', methods=['GET'])
    def get_event_resources(event_id):
        try:
            event = _get_or_404(Event, event_id)
            resources = event.resources.all()
            return jsonify([resource.to_dict() for resource in resources]), 200
        except Exception as e:
            return jsonify({'error': str(e)}), 404
    
    @app.route('/api/admin/refresh-images', methods=['POST'])
    def refresh_images():
        from utils import get_image_for_topic
        updated = 0

        for org in Organization.query.all():
            org.image_url = get_image_for_topic(org.organization_type or org.name, fallback="/static/default-org.jpg")
            updated += 1

        for res in Resource.query.all():
            res.image_url = get_image_for_topic(res.topic or res.title, fallback="/static/default-resource.jpg")
            updated += 1

        for ev in Event.query.all():
            ev.image_url = get_image_for_topic(ev.event_type or ev.name, fallback="/static/default-event.jpg")
            updated += 1

        db.session.commit()
        return jsonify({"updated": updated}), 200

    @app.route("/api/search", methods=["GET"])
    def search():
        query = request.args.get("q", "").strip()
        page = int(request.args.get("page", 1))
        per_page = int(request.args.get("per_page", 12))
        if not query:
            return jsonify({"results": [], "total": 0})

        terms = [t for t in query.lower().split() if t]

        def highlight(text):
            if not text:
                return ""
            
            result = text
            for t in terms:
                pattern = re.compile(re.escape(t), re.IGNORECASE)
                result = pattern.sub(lambda m: f"<mark>{m.group(0)}</mark>", result)

            phrase_pat = re.compile(re.escape(query), re.IGNORECASE)
            result = phrase_pat.sub(lambda m: f"<mark>{m.group(0)}</mark>", result)
            return result

        def relevance_score(name, desc):
            score = 0.0
            nl = (name or "").lower()
            dl = (desc or "").lower()

            if query.lower() in nl: score += 3
            if query.lower() in dl: score += 2

            for t in set(terms):
                if t in nl: score += 1.0
                if t in dl: score += 0.5
            return score

        # TODO: fix if event attributes change
        results = []
        models = [
            ("Organization", Organization, ["name", "description", "location", "services", "organization_type", "website_url", "hours_of_operation"]),
            ("Resource", Resource, ["title", "description", "location", "services", "topic", "organization_name", "languages_supported", "eligibility", "hours_of_operation"]),
            ("Event", Event, ["name", "description", "location", "event_type", "event_url", "map_url"]),
        ]

        results = []
        total = 0

        for model_name, model, attributes in models:
            filters = []

            # Match full phrase
            phrase_filters = [getattr(model, a).ilike(f"%{query}%") for a in attributes]
            
            # Require all words in same field
            and_filters = [and_(*[getattr(model, a).ilike(f"%{t}%") for t in terms]) for a in attributes]
            
            filters.extend(phrase_filters + and_filters)

            # Online/offline keywords
            ql = query.lower()
            if any(word in ql for word in ["online", "virtual"]):
                if hasattr(model, "online_availability"):
                    filters.append(model.online_availability.is_(True))
                if hasattr(model, "is_online"):
                    filters.append(model.is_online.is_(True))
            if any(word in ql for word in ["in-person", "offline"]):
                if hasattr(model, "online_availability"):
                    filters.append(model.online_availability.is_(False))
                if hasattr(model, "is_online"):
                    filters.append(model.is_online.is_(False))

            query_result = (model.query.filter(or_(*filters)).all())

            count = model.query.filter(or_(*filters)).count()
            total += count

            for item in query_result:
                if model_name == "Organization":
                    name = item.name or "N/A"
                    desc = item.description or item.services or "N/A"
                    location = item.location or "N/A"
                    type_label = item.organization_type or "N/A"
                    services = item.services or "N/A"
                    hours = item.hours_of_operation or "N/A"
                    online = "Yes" if getattr(item, "online_availability", False) else "No"
                    website_url = item.website_url or "N/A"
                elif model_name == "Resource":
                    name = item.title or "N/A"
                    desc = item.description or item.services or item.topic or "N/A"
                    location = item.location or "N/A"
                    type_label = item.topic or item.organization_name or "N/A"
                    services = item.services or "N/A"
                    hours = item.hours_of_operation or "N/A"
                    online = "Yes" if getattr(item, "online_availability", False) else "No"
                else:
                    name = item.name or "N/A"
                    desc = item.description or item.event_type or ""
                    location = item.location or "N/A"
                    type_label = item.event_type or "N/A"
                    services = "N/A"
                    hours = "N/A"
                    online = "Yes" if getattr(item, "is_online", False) else "No"

                score = relevance_score(name, desc)

                results.append({
                    "type": model_name,
                    "id": item.id,
                    "name": highlight(name),
                    "description": highlight(desc),
                    "image_url": getattr(item, "image_url", None),
                    "location": highlight(location),
                    "type_label": highlight(type_label),
                    "services": highlight(services),
                    "hours": highlight(hours),
                    "online_availability": online,
                    "registration_open": getattr(item, "registration_open", None),
                    "website_url": highlight(website_url),
                    "score": score,
                })

        results.sort(key=lambda x: x["score"], reverse=True)
        total = len(results)
        start = (page - 1) * per_page
        end = start + per_page
        pages = max((total + per_page - 1) // per_page, 1)
        page_results = results[start:end]

        return jsonify({
            "results": page_results,
            "pagination": {
                "total": total,
                "page": page,
                "per_page": per_page,
                "pages": pages,
                "has_next": page < pages,
                "has_prev": page > 1
            }
        }), 200

    @app.route('/api/health', methods=['GET'])
    def health_check():
        return jsonify({'status': 'healthy', 'message': 'SafeHavenConnect API is running'}), 200
    
    @app.route('/', methods=['GET'])
    def index():
        return jsonify({
            'message': 'SafeHavenConnect API',
            'version': '1.0',
            'endpoints': {
                'organizations': '/api/organizations',
                'resources': '/api/resources',
                'events': '/api/events',
                'health': '/api/health'
            }
        }), 200
    
    return app


if __name__ == '__main__':
    env = os.environ.get('FLASK_ENV', 'development')
    app = create_app(env)
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=(env == 'development'))
