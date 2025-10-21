# Makefile

.PHONY: install dev build lint preview clean test format check status

install:
	npm install

dev:
	npm run dev

build:
	npm run build

lint:
	npm run lint

preview:
	npm run preview

format:
	@echo "Prettier not configured"

clean:
	rm -rf dist/ node_modules/ .vite/

test:
	@echo "Running Selenium acceptance tests..."
	python3 -m pytest src/tests/acceptance_tests.py

check: lint build

status:
	@git status --short 2>/dev/null || echo "Git not available"
	@echo "Node: $(shell node --version 2>/dev/null || echo 'not installed')"
	@echo "NPM: $(shell npm --version 2>/dev/null || echo 'not installed')"
