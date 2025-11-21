# Docker Setup Guide for XpeedOPR

This guide explains how to run the XpeedOPR application using Docker and Docker Compose.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) (version 20.10 or higher)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0 or higher)

## Quick Start

### Production Mode

1. **Clone the repository:**

```bash
git clone https://github.com/gezielcarvalho/xpeedopr.git
cd xpeedopr
```

2. **Create environment file:**

```bash
cp .env.example .env
# Edit .env file with your configuration if needed
```

3. **Build and run all services:**

```bash
docker-compose up --build
```

4. **Access the applications:**
   - Frontend (Customer Portal): http://localhost:3000
   - Backend API: http://localhost:5108
   - Backoffice (Admin Portal): http://localhost:4200
   - API Documentation (Swagger): http://localhost:5108/swagger

### Development Mode

For development with hot-reload:

```bash
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up --build
```

## Docker Commands Reference

### Build Images

```bash
# Build all services
docker-compose build

# Build specific service
docker-compose build backend
docker-compose build frontend
docker-compose build backoffice
```

### Start/Stop Services

```bash
# Start all services in detached mode
docker-compose up -d

# Start specific service
docker-compose up backend

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v
```

### View Logs

```bash
# View all logs
docker-compose logs

# View logs for specific service
docker-compose logs backend
docker-compose logs frontend

# Follow logs in real-time
docker-compose logs -f backend
```

### Execute Commands in Containers

```bash
# Access backend container shell
docker-compose exec backend sh

# Access frontend container shell
docker-compose exec frontend sh

# Run dotnet commands in backend
docker-compose exec backend dotnet --version
```

### Health Checks

```bash
# Check container health status
docker ps

# View detailed health information
docker inspect --format='{{.State.Health.Status}}' xpeedopr-backend
```

## Container Architecture

### Backend Container

- **Base Image:** mcr.microsoft.com/dotnet/aspnet:8.0
- **Build Image:** mcr.microsoft.com/dotnet/sdk:8.0
- **Port:** 8080 (mapped to 5108 on host)
- **Features:**
  - Multi-stage build for optimized image size
  - Health check endpoint
  - Swagger UI for API documentation

### Frontend Container

- **Base Image:** nginx:alpine
- **Build Image:** node:18-alpine
- **Port:** 80 (mapped to 3000 on host)
- **Features:**
  - Optimized production build
  - Nginx web server
  - Gzip compression
  - React Router support
  - Static asset caching

### Backoffice Container

- **Base Image:** nginx:alpine
- **Build Image:** node:18-alpine
- **Port:** 80 (mapped to 4200 on host)
- **Features:**
  - Optimized production build
  - Nginx web server
  - Angular routing support
  - Static asset caching

## Environment Variables

Configure the following environment variables in `.env` file:

### Backend

```env
ASPNETCORE_ENVIRONMENT=Development
ASPNETCORE_URLS=http://+:8080
JWT_SECRET=your-secret-key
JWT_TOKEN_LIFETIME=60
JWT_ISSUER=http://localhost:5108
JWT_AUDIENCE=http://localhost:5108
```

### Frontend

```env
REACT_APP_API_URL=http://localhost:5108
```

### Backoffice

```env
BACKOFFICE_API_URL=http://localhost:5108
```

## Networking

All services are connected via a custom bridge network called `xpeedopr-network`. This allows:

- Internal service-to-service communication
- Service discovery by container name
- Network isolation from other Docker applications

## Volumes

Currently configured volumes:

- `backend-data`: Reserved for future database persistence

## Troubleshooting

### Port Already in Use

If you get a port conflict error:

```bash
# Change ports in docker-compose.yml or .env file
# For example, change "3000:80" to "3001:80" for frontend
```

### Container Fails to Start

```bash
# View detailed logs
docker-compose logs backend

# Rebuild without cache
docker-compose build --no-cache backend
docker-compose up backend
```

### Health Check Failing

```bash
# Check container status
docker ps -a

# Inspect health check logs
docker inspect xpeedopr-backend

# Access container and test manually
docker-compose exec backend curl http://localhost:8080/api/user
```

### Permission Issues (Linux/Mac)

```bash
# Fix file permissions
sudo chown -R $USER:$USER .
```

## Production Deployment

### Build Production Images

```bash
# Build optimized production images
docker-compose build --no-cache

# Tag images for registry
docker tag xpeedopr-backend:latest your-registry/xpeedopr-backend:1.0.0
docker tag xpeedopr-frontend:latest your-registry/xpeedopr-frontend:1.0.0
docker tag xpeedopr-backoffice:latest your-registry/xpeedopr-backoffice:1.0.0
```

### Push to Container Registry

```bash
# Login to your registry
docker login your-registry

# Push images
docker push your-registry/xpeedopr-backend:1.0.0
docker push your-registry/xpeedopr-frontend:1.0.0
docker push your-registry/xpeedopr-backoffice:1.0.0
```

### Security Considerations

1. **Change default secrets** in production
2. **Use HTTPS** with proper SSL certificates
3. **Set appropriate CORS** policies
4. **Use environment variables** for sensitive data
5. **Implement rate limiting** on the backend
6. **Regular security updates** for base images

## Performance Optimization

### Image Size Optimization

- Multi-stage builds reduce final image size
- Alpine Linux base images minimize footprint
- Only production dependencies included

### Caching Strategy

- Layer caching in multi-stage builds
- Nginx caching for static assets
- Gzip compression enabled

### Resource Limits

Add resource limits to `docker-compose.yml`:

```yaml
services:
  backend:
    deploy:
      resources:
        limits:
          cpus: "1"
          memory: 512M
        reservations:
          memory: 256M
```

## Monitoring

### Container Stats

```bash
# View real-time resource usage
docker stats

# View specific container stats
docker stats xpeedopr-backend
```

### Logs Management

```bash
# Limit log size in docker-compose.yml
services:
  backend:
    logging:
      driver: "json-file"
      options:
        max-size: "10m"
        max-file: "3"
```

## Cleanup

```bash
# Remove all containers and networks
docker-compose down

# Remove all containers, networks, and volumes
docker-compose down -v

# Remove all unused images
docker image prune -a

# Complete cleanup (use with caution!)
docker system prune -a --volumes
```

## Next Steps

- [ ] Add database container (PostgreSQL/SQL Server)
- [ ] Implement reverse proxy (Nginx/Traefik)
- [ ] Add Redis for caching
- [ ] Set up CI/CD pipeline
- [ ] Configure container orchestration (Kubernetes)
- [ ] Implement logging aggregation (ELK stack)
- [ ] Add monitoring (Prometheus/Grafana)

## Support

For issues or questions:

- Check logs: `docker-compose logs`
- Verify configuration: `docker-compose config`
- Consult Docker documentation: https://docs.docker.com
