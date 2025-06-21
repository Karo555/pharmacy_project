## Summary
This repository implements a Pharmacy Management System with a **Java Spring Boot** backend and a **React with TypeScript** frontend. The backend exposes RESTful APIs to manage drugs, prescriptions, customers, and inventory, while the frontend provides a responsive UI for pharmacists and administrators to interact with those APIs. All source code is versioned in a single monorepo for ease of atomic commits and unified versioning.

---
## Table of Contents

1. [Technologies](#technologies)
2. [Prerequisites](#prerequisites)
3. [Repository Structure](#repository-structure)
4. [Backend Setup (Spring Boot)](#backend-setup-spring-boot)

    1. [Configuration](#configuration)
    2. [Build & Run](#build--run)
    3. [API Endpoints](#api-endpoints)
5. [Frontend Setup (React + TypeScript)](#frontend-setup-react--typescript)

    1. [Configuration](#configuration-1)
    2. [Install & Run](#install--run)
    3. [Available Scripts](#available-scripts)
6. [Database Migrations](#database-migrations)
7. [Environment Variables](#environment-variables)
8. [Project Structure](#project-structure)
9. [Contributing](#contributing)
10. [License](#license)

---

## Technologies

* **Java with Spring Boot** – Rapidly develop stand-alone, production-grade Spring applications with embedded servers
* **Maven** – Dependency and build management for the Java service 
* **React with TypeScript** – Modern, typed frontend framework for building the pharmacy's user interface
* **Vite** – Next-generation frontend tooling for faster development and optimized builds
* **Material-UI (@mui)** – React UI framework with Material Design components
* **React Router** – Navigation and routing for React single-page applications
* **Redux** – State management for complex application state
* **Zustand** – Lightweight state management alternative to Redux
* **React Context API** – Built-in state management for simpler state needs
* **Docker & Docker Compose** – Containerize both backend and frontend to simplify deployment

---

## Prerequisites
Before you begin, ensure you have the following installed on your machine:

1. **Java Development Kit (JDK)**

    * Needed to compile and run the Spring Boot application
2. **Maven**

    * Required to build and package the backend 
3. **Node.js & npm**

    * Used to install frontend dependencies and run the React application
4. **Docker & Docker Compose (optional but recommended)**

    * Simplifies running both services in containers for development and production environments
5. **Database server**

    * A relational database server; ensure a user and database exist for the Pharmacy project

---

## Project Structure

```
pharmacy_project/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/
│   │   │   │   └── org/
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       ├── data.sql
│   │   │       ├── db/
│   │   │       └── static/
│   ├── pom.xml
│   ├── README.md
│   └── Dockerfile
│
├── frontend/
│   ├── public/
│   │   ├── logo.png
│   │   └── vite.svg
│   ├── src/
│   │   ├── api/                       # API service modules
│   │   │   ├── auth.ts
│   │   │   ├── drug.ts
│   │   │   └── prescription.ts
│   │   ├── assets/                    # Static assets
│   │   ├── components/                # Reusable React components
│   │   │   ├── Drugs/
│   │   │   ├── Error/
│   │   │   ├── Examples/
│   │   │   ├── Home/
│   │   │   ├── Layout/
│   │   │   ├── Prescriptions/
│   │   │   ├── Search/
│   │   │   ├── ui/
│   │   │   └── ProtectedRoute.tsx
│   │   ├── contexts/                  # React Context providers
│   │   │   ├── AuthContext.tsx
│   │   │   ├── CounterContext.tsx
│   │   │   └── ThemeContext.tsx
│   │   ├── hooks/                     # Custom React hooks
│   │   ├── pages/                     # Page components
│   │   │   ├── Auth/
│   │   │   ├── Dashboard/
│   │   │   ├── Drugs/
│   │   │   ├── Prescriptions/
│   │   │   └── Home.tsx
│   │   ├── router/                    # Routing configuration
│   │   ├── store/                     # State management
│   │   │   ├── redux/
│   │   │   └── useCounterStore.ts     # Zustand store
│   │   ├── styles/                    # Global styles
│   │   ├── types/                     # TypeScript type definitions
│   │   ├── utils/                     # Utility functions
│   │   ├── App.tsx                    # Main app component
│   │   ├── main.tsx                   # Application entry point
│   │   └── vite.config.ts             # Vite configuration
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.js
│   ├── eslint.config.js
│   ├── README.md
│   └── Dockerfile
│
├── scripts/                          # Helper scripts
│   ├── build-all.sh
│   └── start-dev.sh
├── docker-compose.yml                # Docker configuration
├── package.json                      # Root package.json
└── README.md                         # This file
```

## Backend Setup (Spring Boot)

### Configuration
The backend configuration is managed through `application.properties` in the `backend/src/main/resources` directory.

### Build & Run
To build and run the backend:

```bash
# Navigate to the backend directory
cd backend

# Build with Maven
./mvnw clean install

# Run the application
./mvnw spring-boot:run
```

## Frontend Setup (React + TypeScript)

### Configuration
The frontend configuration is managed through various files:
- `vite.config.js` - Vite bundler configuration
- `tsconfig.json` - TypeScript configuration
- `eslint.config.js` - ESLint configuration

### Install & Run
To set up and run the frontend:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

## Running with Docker

The project includes Docker configuration to run both backend and frontend services:

```bash
# Build and start all services
docker-compose up --build

# Run in background
docker-compose up -d
```

## Scripts

The `scripts` directory contains helper scripts:

- `build-all.sh` - Builds both backend and frontend
- `start-dev.sh` - Starts development environment

## Features

- **Authentication & Authorization** - Secure login and registration
- **Drug Management** - Create, read, update, and delete drug information
- **Prescription Management** - Handle patient prescriptions
- **User Profiles** - Manage user information
- **Responsive Design** - Works on desktop and mobile devices
- **Multiple State Management Options** - Examples using Context API, Redux, and Zustand

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License.
