# Architecture

## Current shape

```text
React customer portal ---- mock ticket service
          |
          | planned live ticket integration
          v
.NET 8 Web API ---- authentication demonstration
          |
          +---- planned persistent data layer

Angular backoffice ---- scaffold / early implementation
```

Docker Compose defines local containers for the API, React frontend, and Angular backoffice, with Nginx serving the frontend applications. The topology is useful for local demonstration and development, but it is not an approved production architecture.

## Implementation boundary

The user/authentication API is more developed than the ticket domain. The customer frontend currently retrieves ticket data from a mock source, while backend ticket endpoints and durable ticket persistence are planned. The Angular backoffice is structurally present but still minimal.

## Configuration boundary

Local container configuration includes development authentication-signing settings. It must not be treated as a real secret-management solution. Any external deployment requires a separate secrets, identity, and configuration review.
