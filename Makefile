# Makefile for SafeHavenConnect

.PHONY: install dev build lint preview clean test format check status help backend-install backend-dev backend-test docker-up docker-down

# Default target
help:
	@echo "SafeHavenConnect - Available Commands:"
	@echo ""
	@echo "Frontend:"
	@echo "  make install         - Install frontend dependencies"
	@echo "  make dev             - Run frontend dev server"
	@echo "  make build           - Build frontend for production"
	@echo "  make lint            - Run frontend linter"
	@echo "  make preview         - Preview production build"
	@echo ""
	@echo "Backend:"
	@echo "  make backend-install - Install backend dependencies"
	@echo "  make backend-dev     - Run Flask backend locally"
	@echo "  make backend-test    - Run backend tests"
	@echo ""
	@echo "Docker:"
	@echo "  make docker-up       - Start all services with Docker Compose"
	@echo "  make docker-down     - Stop all Docker services"
	@echo ""
	@echo "Testing & QA:"
	@echo "  make test            - Run all tests"
	@echo "  make check           - Run lint and build"
	@echo ""
	@echo "Utilities:"
	@echo "  make clean           - Remove build artifacts"
	@echo "  make status          - Show git and environment status"

# Frontend commands
install:
	@echo "Installing frontend dependencies..."
	cd frontend && npm install

dev:
	@echo "Starting frontend dev server..."
	cd frontend && npm run dev

build:
	@echo "Building frontend..."
	cd frontend && npm run build

lint:
	@echo "Linting frontend..."
	cd frontend && npm run lint

preview:
	@echo "Previewing production build..."
	cd frontend && npm run preview

# Backend commands
backend-install:
	@echo "Installing backend dependencies..."
	cd backend && pip3 install -r requirements.txt

backend-dev:
	@echo "Starting Flask backend..."
	cd backend && python3 app.py

backend-test:
	@echo "Running backend tests..."
	cd backend && python3 -m pytest

# Docker commands
docker-up:
	@echo "Starting Docker services..."
	cd backend && docker-compose up -d
	@echo "Services running at:"
	@echo "  Backend: http://localhost:5000"
	@echo "  Database: localhost:5432"

docker-down:
	@echo "Stopping Docker services..."
	cd backend && docker-compose down

# Testing
test:
	@echo "Running all tests..."
	@echo "Running Selenium acceptance tests..."
	python3 -m pytest frontend/src/tests/acceptance_tests.py || true
	@echo "Running backend tests..."
	cd backend && python3 -m pytest || true

# Quality checks
check: lint build
	@echo "All checks passed!"

format:
	@echo "Formatting not configured. Consider adding Prettier/Black."

# Cleanup
clean:
	@echo "Cleaning build artifacts..."
	rm -rf frontend/dist/ frontend/node_modules/ frontend/.vite/
	rm -rf backend/__pycache__/ backend/*.pyc backend/.pytest_cache/
	rm -rf public/
	@echo "Clean complete!"

# Status
status:
	@echo "=== Git Status ==="
	@git status --short 2>/dev/null || echo "Git not available"
	@echo ""
	@echo "=== Environment ==="
	@echo "Node: $(shell node --version 2>/dev/null || echo 'not installed')"
	@echo "NPM: $(shell npm --version 2>/dev/null || echo 'not installed')"
	@echo "Python: $(shell python3 --version 2>/dev/null || echo 'not installed')"
	@echo "Docker: $(shell docker --version 2>/dev/null || echo 'not installed')"
	@echo ""
	@echo "=== Current Branch ==="
	@git branch --show-current 2>/dev/null || echo "Not in a git repository"
