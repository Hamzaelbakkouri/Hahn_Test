# Ticket Management API

A .NET-based API for managing tickets, providing functionalities for creating, updating, and retrieving ticket information.

## Table of Contents
- [Project Structure](#project-structure)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
- [Database Migrations](#database-migrations)
- [Testing](#testing)
- [Configuration](#configuration)

## Project Structure

```
KAHN_TEST/
├── controllers/
│   └── TicketsController.cs
├── Data/
├── DTOs/
│   ├── CreateTicketDto.cs
│   ├── PaginatedResult.cs
│   └── UpdateTicketDto.cs
├── Helpers/
├── Migrations/
├── Models/
│   └── Ticket.cs
├── obj/
├── Properties/
├── services/
│   ├── TicketServiceImplementation.cs
│   └── TicketServiceInterface.cs
├── Tests/
├── .gitignore
├── appsettings.Development.json
├── appsettings.json
├── kahn_test.csproj
├── kahn_test.csproj.user
├── kahn_test.sln
├── Program.cs
└── README.md
```

## Setup

1. Clone the repository:
   ```
   git clone https://github.com/Hamzaelbakkouri/Hahn_Test.git
   ```
2. Navigate to the project directory:
   ```
   cd KAHN_TEST
   ```
3. Restore the required packages:
   ```
   dotnet restore
   ```

## Running the Application

1. Build and run the application:
   ```
   dotnet watch run
   ```
2. The API will be available at `https://localhost:5001` (or `http://localhost:5000`).

## API Documentation

This project uses Swagger for API documentation. To access the Swagger UI:

1. Run the application.
2. Open a web browser and navigate to `https://localhost:5001/swagger`.
3. You'll see the Swagger UI with all available endpoints.
4. Test endpoints directly from the Swagger UI by clicking "Try it out" on any endpoint.

## Database Migrations

To apply database migrations:

1. Ensure you have the EF Core CLI tools installed:
   ```
   dotnet tool install --global dotnet-ef
   ```
2. Apply migrations:
   ```
   dotnet ef database update
   ```

## Testing

Run the tests using:
```
dotnet test
```

## Configuration

- `appsettings.json`: Contains production configuration.
- `appsettings.Development.json`: Contains development-specific configuration.

