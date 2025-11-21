# XpeedOPR: IT Helpdesk Ticket Management System

XpeedOPR is a modern, full-stack helpdesk ticket management system designed for IT services in small to medium-sized companies. The system enables efficient tracking and resolution of hardware and software issues through a user-friendly interface, facilitating seamless communication between customers, technicians, and managers.

## 🏗️ Architecture Overview

The application follows a modern three-tier architecture:

- **Backend API** - .NET 8.0 Web API with JWT authentication
- **Customer Frontend** - React 18 with TypeScript and Zustand state management
- **Backoffice Portal** - Angular 17 for internal management (in development)

## ✨ Key Features

### Current Implementation

- **Authentication System**

  - User registration and login with JWT token generation
  - Password hashing using BCrypt
  - Configurable token lifetime (60 minutes default)

- **Ticket Management**

  - Create, read, update, and delete tickets
  - Priority-based ticket sorting (1-3 priority levels)
  - Real-time state management with Zustand
  - Detailed ticket views with routing

- **Modern UI/UX**
  - React Router for navigation
  - Context API for theme and user management
  - TailwindCSS for responsive styling
  - TypeScript for type safety

### Planned Features

- Technician dashboard for ticket assignment and management
- Manager analytics and reporting
- Customer feedback and rating system
- Real-time notifications
- Database integration (currently using mock API)

## 🛠️ Technology Stack

### Backend (`/backend`)

- **.NET 8.0** - Modern web API framework
- **ASP.NET Core** - RESTful API services
- **JWT Authentication** - Secure token-based auth
- **BCrypt.Net** - Password hashing
- **Swagger/OpenAPI** - API documentation

### Frontend (`/frontend`)

- **React 18.3.1** - UI library
- **TypeScript 4.9.5** - Type safety
- **React Router 6.25** - Client-side routing
- **Zustand 4.5.4** - State management
- **Axios 1.7.2** - HTTP client
- **TailwindCSS 3.4.7** - Utility-first CSS
- **React Testing Library** - Component testing

### Backoffice (`/backoffice`)

- **Angular 17.2** - Enterprise framework
- **TypeScript 5.3.2** - Type safety
- **RxJS 7.8** - Reactive programming
- **Jasmine/Karma** - Testing framework

## 📋 Prerequisites

### Using Docker (Recommended)

- [Docker](https://docs.docker.com/get-docker/) (version 20.10+)
- [Docker Compose](https://docs.docker.com/compose/install/) (version 2.0+)

### Manual Setup

- [.NET 8.0 SDK](https://dotnet.microsoft.com/download)
- [Node.js 16+](https://nodejs.org/) and npm
- [Angular CLI 17+](https://angular.io/cli) (for backoffice)
- Git

## 🚀 Installation and Setup

### Option 1: Docker Setup (Recommended) 🐳

The fastest way to get the entire application running:

```bash
# Clone the repository
git clone https://github.com/gezielcarvalho/xpeedopr.git
cd xpeedopr

# Copy environment file
cp .env.example .env

# Build and start all services
docker-compose up --build
```

**Access the applications:**

- 🎯 **Frontend** (Customer Portal): http://localhost:3000
- 🔧 **Backend API**: http://localhost:5108
- 📊 **Backoffice** (Admin Portal): http://localhost:4200
- 📚 **API Documentation** (Swagger): http://localhost:5108/swagger

**Note for Windows Users:** Docker should be running in WSL2 for optimal performance.

For detailed Docker instructions, troubleshooting, and advanced configurations, see [DOCKER.md](./DOCKER.md)

### Option 2: Manual Setup

#### 1. Clone the Repository

```bash
git clone https://github.com/gezielcarvalho/xpeedopr.git
cd xpeedopr
```

#### 2. Backend Setup

```bash
cd backend
dotnet restore
dotnet build
dotnet run
```

The API will be available at `https://localhost:5000` (or the port specified in `launchSettings.json`)

**Configuration:**

- Update `appsettings.json` to configure:
  - JWT secret key and token lifetime
  - Database connection strings (when implemented)
  - CORS policies

#### 3. Frontend Setup

```bash
cd frontend
npm install
npm start
```

The application will be available at `http://localhost:3000`

#### 4. Backoffice Setup (Optional)

```bash
cd backoffice
npm install
ng serve
```

The backoffice will be available at `http://localhost:4200`

## 🐳 Docker Support

✅ **Fully Dockerized and Running!**

This project includes complete Docker support with multi-stage builds and docker-compose orchestration:

- **Production Dockerfiles** - Optimized multi-stage builds for all services
- **Development Dockerfiles** - Hot-reload support for rapid development
- **Docker Compose** - Orchestrates all services with a single command
- **Health Checks** - Automatic container health monitoring
- **Nginx** - Production-grade reverse proxy for frontend apps
- **Custom Networking** - Isolated bridge network for service communication

All three services (Backend, Frontend, Backoffice) are successfully containerized and tested.

See [DOCKER.md](./DOCKER.md) for comprehensive Docker documentation.

## 📁 Project Structure

```
xpeedopr/
├── docker-compose.yml          # Docker orchestration
├── docker-compose.dev.yml      # Development overrides
├── .env.example               # Environment variables template
├── DOCKER.md                  # Docker documentation
├── backend/                    # .NET 8.0 Web API
│   ├── Dockerfile            # Production build
│   ├── .dockerignore         # Docker ignore patterns
│   ├── Controllers/           # API endpoints
│   │   ├── AuthController.cs # Authentication & user management
│   │   ├── UserController.cs # User operations
│   │   └── WeatherForecastController.cs # Sample controller
│   ├── Models/               # Data models
│   │   ├── User.cs          # User entity
│   │   └── UserDto.cs       # User data transfer object
│   ├── appsettings.json     # Configuration
│   └── Program.cs           # Application entry point
│
├── frontend/                  # React + TypeScript SPA
│   ├── Dockerfile            # Production build
│   ├── Dockerfile.dev        # Development with hot-reload
│   ├── nginx.conf           # Nginx configuration
│   ├── .dockerignore        # Docker ignore patterns
│   ├── src/
│   │   ├── components/       # React components
│   │   │   ├── Home.tsx     # Home page
│   │   │   ├── TicketsList.tsx    # Ticket list view
│   │   │   ├── TicketDetails.tsx  # Ticket detail view
│   │   │   ├── TicketForm.tsx     # Create/edit ticket
│   │   │   └── TicketItem.tsx     # Ticket list item
│   │   ├── stores/          # Zustand state management
│   │   │   ├── ticketStore.ts    # Ticket state & actions
│   │   │   └── counterStore.ts   # Example counter store
│   │   ├── context/         # React Context providers
│   │   │   ├── ThemeContext.ts   # Theme management
│   │   │   └── UserContext.ts    # User context
│   │   ├── services/        # API service layer
│   │   │   └── ticketService.ts  # Ticket API calls
│   │   ├── types/          # TypeScript definitions
│   │   │   └── ticketTypes.ts   # Ticket type definitions
│   │   ├── enums/          # Enums and constants
│   │   │   └── ticketsEnums.ts  # Priority status enum
│   │   └── App.tsx         # Main application component
│   ├── public/             # Static assets
│   └── package.json        # Dependencies
│
└── backoffice/               # Angular 17 admin portal
    ├── Dockerfile            # Production build
    ├── Dockerfile.dev        # Development with hot-reload
    ├── nginx.conf           # Nginx configuration
    ├── .dockerignore        # Docker ignore patterns
    ├── src/
    │   ├── app/             # Angular components & modules
    │   │   ├── app.component.ts  # Root component
    │   │   ├── app.routes.ts     # Routing configuration
    │   │   └── app.config.ts     # App configuration
    │   └── assets/          # Static assets
    └── angular.json         # Angular configuration
```

## 🔐 API Endpoints

### Authentication

- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login and receive JWT token

### Users

- `GET /api/user` - Get user information (returns "Hello World" - WIP)

### Tickets (Frontend Only - Mock API)

Currently using JSONPlaceholder API for demonstration:

- GET tickets list
- POST new ticket
- PUT update ticket
- DELETE ticket

## 🧪 Testing

### Backend

```bash
cd backend
dotnet test
```

### Frontend

```bash
cd frontend
npm test                # Run tests
npm test -- --coverage  # Run tests with coverage
```

### Backoffice

```bash
cd backoffice
ng test
```

## 🔧 Development Notes

### Current Status

- ✅ Backend API with authentication (Dockerized & Running)
- ✅ Frontend ticket management UI (Dockerized & Running)
- ✅ Backoffice Angular portal (Dockerized & Running)
- ✅ State management with Zustand
- ✅ Routing and navigation
- ✅ Docker containerization with multi-stage builds
- ✅ Docker Compose orchestration
- ✅ Production-ready Nginx configuration
- ✅ Health checks and auto-restart policies
- ⏳ Database integration (planned)
- ⏳ Backend ticket API endpoints (planned)
- ⏳ Backoffice features implementation (in progress)
- ⏳ Real-time features (planned)

### Known Issues

- Frontend currently uses JSONPlaceholder mock API
- No database persistence yet
- Backend ticket endpoints not implemented
- Backoffice Angular app is scaffolded with minimal functionality

### Verified Working

✅ All Docker containers build and run successfully
✅ Backend API accessible at http://localhost:5108 with Swagger UI
✅ Frontend React app accessible at http://localhost:3000
✅ Backoffice Angular app accessible at http://localhost:4200
✅ Health checks passing on all containers
✅ Service-to-service networking functional

### Next Steps

1. Implement database layer (SQL Server/PostgreSQL)
2. Create ticket management endpoints in backend
3. Connect frontend to real backend API
4. Implement role-based access control
5. Build out backoffice features
6. Set up CI/CD pipeline
7. Add Kubernetes deployment manifests
8. Implement logging and monitoring

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

Please ensure your code follows the existing style and includes appropriate tests.

## 📝 License

This project is licensed under the [MIT License](LICENSE).

## 👤 Author

**Geziel Carvalho**

- GitHub: [@gezielcarvalho](https://github.com/gezielcarvalho)

---

**Last Updated:** November 2025
