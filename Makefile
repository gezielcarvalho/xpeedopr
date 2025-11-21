.PHONY: help build up down logs clean restart dev prod test backend frontend backoffice

# Default target
help:
	@echo "XpeedOPR Docker Commands"
	@echo "========================"
	@echo ""
	@echo "Setup Commands:"
	@echo "  make setup      - Initial setup (copy .env.example to .env)"
	@echo "  make build      - Build all Docker images"
	@echo ""
	@echo "Run Commands:"
	@echo "  make up         - Start all services (production mode)"
	@echo "  make dev        - Start all services (development mode with hot-reload)"
	@echo "  make down       - Stop all services"
	@echo "  make restart    - Restart all services"
	@echo ""
	@echo "Service-Specific Commands:"
	@echo "  make backend    - Start only backend service"
	@echo "  make frontend   - Start only frontend service"
	@echo "  make backoffice - Start only backoffice service"
	@echo ""
	@echo "Utility Commands:"
	@echo "  make logs       - View logs from all services"
	@echo "  make logs-backend   - View backend logs"
	@echo "  make logs-frontend  - View frontend logs"
	@echo "  make logs-backoffice - View backoffice logs"
	@echo "  make ps         - List running containers"
	@echo "  make shell-backend  - Access backend container shell"
	@echo "  make shell-frontend - Access frontend container shell"
	@echo ""
	@echo "Cleanup Commands:"
	@echo "  make clean      - Stop and remove all containers, networks, and volumes"
	@echo "  make prune      - Remove all unused Docker resources"
	@echo ""
	@echo "Testing Commands:"
	@echo "  make test       - Run tests in all services"
	@echo "  make test-backend   - Run backend tests"
	@echo "  make test-frontend  - Run frontend tests"

# Setup
setup:
	@if [ ! -f .env ]; then \
		cp .env.example .env; \
		echo "✅ .env file created from .env.example"; \
		echo "⚠️  Please review and update .env file if needed"; \
	else \
		echo "⚠️  .env file already exists"; \
	fi

# Build
build:
	docker-compose build

build-no-cache:
	docker-compose build --no-cache

# Run services
up: setup
	docker-compose up

up-detached: setup
	docker-compose up -d

dev: setup
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up

dev-detached: setup
	docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

prod: setup build
	docker-compose up

# Stop services
down:
	docker-compose down

stop:
	docker-compose stop

# Restart services
restart:
	docker-compose restart

# Individual services
backend:
	docker-compose up backend

frontend:
	docker-compose up frontend

backoffice:
	docker-compose up backoffice

# Logs
logs:
	docker-compose logs -f

logs-backend:
	docker-compose logs -f backend

logs-frontend:
	docker-compose logs -f frontend

logs-backoffice:
	docker-compose logs -f backoffice

# Container management
ps:
	docker-compose ps

shell-backend:
	docker-compose exec backend sh

shell-frontend:
	docker-compose exec frontend sh

shell-backoffice:
	docker-compose exec backoffice sh

# Testing
test:
	@echo "Running tests in all services..."
	docker-compose exec backend dotnet test
	docker-compose exec frontend npm test -- --watchAll=false
	docker-compose exec backoffice ng test --watch=false

test-backend:
	docker-compose exec backend dotnet test

test-frontend:
	docker-compose exec frontend npm test -- --watchAll=false

test-backoffice:
	docker-compose exec backoffice ng test --watch=false

# Cleanup
clean:
	docker-compose down -v --remove-orphans
	@echo "✅ All containers, networks, and volumes removed"

prune:
	docker system prune -a --volumes -f
	@echo "✅ All unused Docker resources removed"

# Health check
health:
	@echo "Checking container health..."
	@docker ps --format "table {{.Names}}\t{{.Status}}\t{{.Ports}}"
