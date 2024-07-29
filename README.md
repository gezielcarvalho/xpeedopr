# XpeedOPR: IT Helpdesk Ticket Management System

XpeedOPR is a comprehensive software solution designed to manage helpdesk tickets for IT services in small to medium-sized companies. The system facilitates the tracking and resolution of hardware and software issues reported by customers, allowing for efficient communication between customers, technicians, and managers. Customers can open tickets, track their status, and rate the service upon resolution. Technicians can view and address incoming tickets, while managers can monitor overall statistics and ticket status. Developed using .NET for the backend, Angular for the backoffice, ReactJS for the frontend and SQL Server for database management, XpeedOPR is deployed in a Docker container for easy scalability and management.

## Key Features

- **Ticket Management:** Customers can easily open tickets for hardware and software issues, providing detailed descriptions and tracking their progress until resolution.
- **Technician Dashboard:** Technicians have access to a dedicated dashboard where they can view and prioritize incoming tickets, assign them to specific technicians, and update ticket status as they work on resolutions.

- **Manager Analytics:** Managers can monitor overall statistics and performance metrics, including ticket resolution times, customer satisfaction ratings, and technician workload, enabling informed decision-making and resource allocation.

- **Customer Feedback:** Upon resolution of a ticket, customers have the opportunity to rate the service provided, providing valuable feedback for continuous improvement.

## Technologies Used

- **Backend:** .NET
- **Backoffice:** Angular 
- **Frontend:** ReactJS
- **Database:** SQL Server
- **Deployment:** Docker

## Installation and Setup

1. Clone the repository: `git clone https://github.com/gezielcarvalho/xpeedopr.git`
2. Set up the backend:
   - Navigate to the `/backend` directory.
   - Install dependencies: `dotnet restore`
   - Set up database connection strings in `appsettings.json`.
   - Run migrations: `dotnet ef database update`
   - Start the backend server: `dotnet run`
3. Set up the backoffice:
   - Navigate to the `/backoffice` directory.
   - Install dependencies: `npm install`
   - Start the development server: `ng serve`
4. Set up the frontend:
   - Navigate to the `/frontend` directory.
   - Install dependencies: `npm install`
   - Start the development server: `npm start`
4. Access the application at `http://localhost:3000` in your web browser.

## Usage

- Customers can register and log in to the XpeedOPR system to open new tickets and track the status of existing tickets.
- Technicians can log in to the system to view and manage incoming tickets, update ticket status, and communicate with customers.
- Managers can access analytics and reports to monitor overall performance and make data-driven decisions.
- Upon resolution of a ticket, customers can provide feedback and ratings for the service received.

## Contributing

Contributions to XpeedOPR are welcome! Please fork the repository, make your changes, and submit a pull request with your improvements.

## License

This project is licensed under the [MIT License](LICENSE).

---
