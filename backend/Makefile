# Convenience Makefile for backend ops (Docker Compose)

.PHONY: up down rebuild logs ps shell db-create db-seed db-reseed health import-homeless import-hrsa import-eventbrite

up:
	@docker compose up -d

down:
	@docker compose down

rebuild:
	@docker compose build --no-cache backend && docker compose up -d backend

logs:
	@docker compose logs -f backend

ps:
	@docker compose ps

shell:
	@docker compose exec backend sh

# Initialize database schema only
db-create:
	@docker compose exec backend python init_db.py --create-only

# Populate database with sample data (drops/recreates tables as needed)
db-seed:
	@docker compose exec backend python init_db.py --with-data

# Reseed convenience target (same as db-seed)
db-reseed: db-seed

# Check API health from host (expects backend published on port 80)
health:
	@curl -s -o /dev/null -w '%{http_code}\n' http://localhost/api/health

# Data imports (run inside backend container)
import-homeless:
	@docker compose exec backend python homeless-api-import.py

import-hrsa:
	@docker compose exec backend python hrsa-import.py

# Note: current script saves JSON only; does not write to DB
import-eventbrite:
	@docker compose exec backend python eventbrite-import.py
