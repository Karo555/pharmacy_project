## Summary
This repository implements a Pharmacy Management System with a **Java Spring Boot** backend and a **Node.js/Express + React** frontend. The backend exposes RESTful APIs to manage drugs, prescriptions, customers, and inventory, while the frontend provides a responsive UI for pharmacists and administrators to interact with those APIs. All source code is versioned in a single monorepo for ease of atomic commits and unified versioning. ([docs.github.com][1], [spring.io][2])

---
## Table of Contents

1. [Technologies](#technologies)
2. [Prerequisites](#prerequisites)
3. [Repository Structure](#repository-structure)
4. [Backend Setup (Spring Boot)](#backend-setup-spring-boot)

    1. [Configuration](#configuration)
    2. [Build & Run](#build--run)
    3. [API Endpoints](#api-endpoints)
5. [Frontend Setup (Node.js + React)](#frontend-setup-nodejs--react)

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

* **Java 17+ with Spring Boot** – Rapidly develop stand-alone, production-grade Spring applications with embedded servers (Tomcat/Jetty) 
* **Maven (or Gradle)** – Dependency and build management for the Java service 
* **Node.js (v16+), Express.js** – Backend-for-frontend server for serving React assets and proxying API requests
* **React (Create React App)** – Single-page application (SPA) used for the pharmacy’s user interface 
* **PostgreSQL (or MySQL)** – Relational database for storing pharmacy data (drugs, prescriptions, users).
* **Docker & Docker Compose** (optional) – Containerize both backend and frontend to simplify deployment. Using Compose lets you bring up the entire system with `docker-compose up --build`. 

---

## Prerequisites
Before you begin, ensure you have the following installed on your machine:

1. **Java Development Kit (JDK) 17 or higher**

    * Needed to compile and run the Spring Boot application
2. **Maven 3.6+ (or Gradle 7+ if you prefer Gradle)**

    * Required to build and package the backend 
3. **Node.js v16 or later & npm (or Yarn)**

    * Used to install frontend dependencies and run the React application.
4. **Docker & Docker Compose (optional but recommended)**

    * Simplifies running both services in containers for development and production environments.
5. **PostgreSQL (or MySQL) 13+**

    * A relational database server; ensure a user and database exist for the Pharmacy project.

---

## Project Structure

text
```
pharmacy_project/
├── backend/
│   ├── src/
│   │   ├── main/
│   │   │   ├── java/com/pharmacy/
│   │   │   │   ├── controller/         # REST controllers
│   │   │   │   ├── dto/                # Data Transfer Objects
│   │   │   │   ├── entity/             # JPA entity classes
│   │   │   │   ├── repository/         # Spring Data JPA repos
│   │   │   │   ├── security/           # Security configs (JWT filters, user details)
│   │   │   │   └── service/            # Business logic services
│   │   │   └── resources/
│   │   │       ├── application.properties
│   │   │       └── db/
│   │   │           └── migration/      # Flyway/Liquibase scripts (if used)
│   │   └── test/
│   ├── pom.xml                          # Maven POM (or build.gradle)
│   └── Dockerfile
│
├── frontend/
│   ├── public/
│   │   ├── index.html                   # Main HTML file
│   │   └── favicon.ico
│   ├── src/
│   │   ├── components/                  # Reusable React components (e.g., Navbar, DrugCard)
│   │   ├── pages/                       # Page components (e.g., LoginPage, DashboardPage)
│   │   ├── services/                    # Axios API service wrappers (e.g., drugService.js)
│   │   ├── App.tsx                      # Main React component
│   │   └── index.tsx                    # React entry point
│   ├── package.json                     # Dependencies and scripts
│   ├── tsconfig.json                    # TypeScript compiler options
│   ├── .env.development
│   └── Dockerfile
│
├── docker-compose.yml                   # Bring up backend, frontend, and db together
├── .gitignore
└── README.md                            # This file
```

---

## Backend Setup (Spring Boot)

### Configuration

1. **Database Connection**

    * In `backend/src/main/resources/application.properties` (or `application.yml`), set your DB URL, username, and password. For PostgreSQL, an example:

      ```properties
      spring.datasource.url=jdbc:postgresql://localhost:5432/pharmacy_db
      spring.datasource.username=pharmacy_user
      spring.datasource.password=securepassword
      spring.jpa.hibernate.ddl-auto=update
      spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.PostgreSQLDialect
      ```
    * If you prefer MySQL:

      ````properties
      spring.datasource.url=jdbc:mysql://localhost:3306/pharmacy_db
      spring.datasource.username=pharmacy_user
      spring.datasource.password=securepassword
      spring.jpa.hibernate.ddl-auto=update
      spring.jpa.properties.hibernate.dialect=org.hibernate.dialect.MySQL8Dialect
      ``` :contentReference[oaicite:11]{index=11}  
 
      ````

2. **Port & Profile**

    * By default, Spring Boot runs on port **8000**. You can override in `application.properties`:

      ```properties
      server.port=8000
      spring.profiles.active=dev
      ```
    * To use a different profile (e.g., `prod`), run with `-Dspring.profiles.active=prod`.

3. **Entity & Repository Setup**

    * Place JPA entity classes (e.g., `Drug`, `Prescription`, `Customer`) under `backend/src/main/java/com/pharmacy/entity/`.
    * Define Spring Data JPA repositories (e.g., `DrugRepository extends JpaRepository<Drug, Long>`) under `backend/src/main/java/com/pharmacy/repository/`.

### Build & Run

1. **Navigate to the Backend Folder**

   ```bash
   cd pharmacy_project/backend
   ```

2. **Run with Maven**

    * **Compile, Test, and Package**:

      ````bash
      mvn clean package
      ``` :contentReference[oaicite:13]{index=13}  
      ````
    * **Run Directly (Spring Boot Dev Mode)**:

      ```bash
      mvn spring-boot:run
      ```

      Spring Boot will compile on the fly and restart on changes (if DevTools is included).
    * **Or Run from the JAR**:

      ```bash
      java -jar target/pharmacyProject-0.0.1-SNAPSHOT.jar
      ```

      Confirm the exact JAR name with:

      ````bash
      ls target/*.jar
      ``` :contentReference[oaicite:15]{index=15}  
 
      ````

3. **Run with Docker** (optional)

    * Build the image:

      ```bash
      docker build -t pharmacy-backend:latest .
      ```
    * Run the container (mapping port 8000):

      ````bash
      docker run -d --name pharmacy-backend -p 8000:8000 \
        -e SPRING_DATASOURCE_URL=jdbc:postgresql://host.docker.internal:5432/pharmacy_db \
        -e SPRING_DATASOURCE_USERNAME=pharmacy_user \
        -e SPRING_DATASOURCE_PASSWORD=securepassword \
        pharmacy-backend:latest
      ``` :contentReference[oaicite:16]{index=16}  
      ````

### API Endpoints

Below is a non-exhaustive list of REST endpoints provided by the backend. Adjust package names and paths as needed:

| HTTP Method | Path                      | Description                             |
| ----------- | ------------------------- | --------------------------------------- |
| `POST`      | `/api/auth/login`         | Authenticate a user (returns JWT token) |
| `POST`      | `/api/auth/register`      | Register a new pharmacist/customer      |
| `GET`       | `/api/drugs`              | List all drugs                          |
| `GET`       | `/api/drugs/{id}`         | Get details of a single drug by ID      |
| `POST`      | `/api/drugs`              | Add a new drug to inventory             |
| `PUT`       | `/api/drugs/{id}`         | Update an existing drug                 |
| `DELETE`    | `/api/drugs/{id}`         | Remove a drug from inventory            |
| `GET`       | `/api/prescriptions`      | List all prescriptions                  |
| `POST`      | `/api/prescriptions`      | Create a new prescription               |
| `PUT`       | `/api/prescriptions/{id}` | Update prescription details             |
| `DELETE`    | `/api/prescriptions/{id}` | Cancel/delete a prescription            |
| `GET`       | `/api/customers`          | List all customers                      |
| `GET`       | `/api/customers/{id}`     | Get customer details by ID              |
| `PUT`       | `/api/customers/{id}`     | Update customer profile                 |
| `DELETE`    | `/api/customers/{id}`     | Delete a customer account               |

> **Note:**
>
> 1. All endpoints under `/api/**` expect or return JSON (use `Content-Type: application/json`).
> 2. Endpoints prefixed with `/api/auth/**` handle user authentication/authorization.
> 3. Secure routes (e.g., creating/updating/deleting resources) require a valid Bearer JWT token in the `Authorization` header.

---

## Frontend Setup (Node.js + React)

### Configuration

1. **API Base URL**

    * Create a `.env.development` file in `frontend/` containing:

      ````env
      REACT_APP_API_URL=http://localhost:8000/api
      ``` :contentReference[oaicite:17]{index=17}  
      ````
    * For production builds, set `REACT_APP_API_URL` to your deployed backend’s domain.

2. **Ports & Proxy**

    * By default, Create React App uses port **3000**. To avoid CORS issues during development, add this to `frontend/package.json`:

      ```jsonc
      {
        // ...
        "proxy": "http://localhost:8000"
      }
      ```

      This tells the dev server to forward unknown requests (e.g., `/api/drugs`) to `http://localhost:8000`
### Install & Run

1. **Navigate to the Frontend Folder**

   ```bash
   cd pharmacy_project/frontend
   ```

2. **Install Dependencies**

   ```bash
   npm install
   ```

   or, if you prefer Yarn:

   ````bash
   yarn install
   ``` :contentReference[oaicite:19]{index=19}  

   ````

3. **Start the Development Server**

   ```bash
   npm start
   ```

   This will launch the React app at `http://localhost:3000`. Thanks to the proxy setting, API calls to `/api/**` will be forwarded automatically to `http://localhost:8000`.

4. **Build for Production**

   ```bash
   npm run build
   ```

   The optimized production assets will be output to `frontend/build/`. You can then serve those files from any static host (e.g., Nginx, S3) or let the Spring Boot backend serve them by copying `build/*` into `backend/src/main/resources/static/` and rebuilding the backend. 

### Available Scripts

In the `frontend/` directory, you can run:

* `npm start`
  Starts the development server with hot reload (port 3000).

* `npm run build`
  Builds the app for production to the `build/` folder. It correctly bundles React in production mode and optimizes the build for the best performance.

* `npm test`
  Runs the test watcher in an interactive mode. Use `npm test -- --coverage` for coverage reports.

* `npm run lint`
  Checks for ESLint/Prettier issues in your code. 

---

## Database Migrations

1. **Flyway / Liquibase (optional)**

    * If you use Flyway (for PostgreSQL or MySQL), place migration scripts under `backend/src/main/resources/db/migration/`.
    * Flyway auto-runs migrations on application startup if configured:

      ````properties
      spring.flyway.enabled=true
      spring.flyway.locations=classpath:db/migration
      ``` :contentReference[oaicite:26]{index=26}  
 
      ````
2. **Manual SQL Scripts**

    * You can also run SQL scripts manually:

      ```bash
      psql -U pharmacy_user -d pharmacy_db -f backend/src/main/resources/schema.sql
      ```

      (Change `psql` to `mysql` if using MySQL.) 

---

## Environment Variables

Use the following environment variables (either in `.env` files or Docker Compose) to configure both apps:

### Backend (`application.properties` or OS ENV):

| Variable                        | Purpose                                             | Example                                 |
| ------------------------------- | --------------------------------------------------- | --------------------------------------- |
| `SPRING_DATASOURCE_URL`         | JDBC URL to your PostgreSQL/MySQL instance          | `jdbc:postgresql://db:5432/pharmacy_db` |
| `SPRING_DATASOURCE_USERNAME`    | Database username                                   | `pharmacy_user`                         |
| `SPRING_DATASOURCE_PASSWORD`    | Database password                                   | `securepassword`                        |
| `SPRING_JPA_HIBERNATE_DDL_AUTO` | DDL auto-update policy (`none`, `update`, `create`) | `update`                                |
| `SPRING_PROFILES_ACTIVE`        | Active profile (`dev`, `prod`)                      | `dev`                                   |
| `JWT_SECRET`                    | Secret key for signing JSON Web Tokens              | `superSecretJWTKey`                     |
| `JWT_EXPIRATION_MS`             | JWT expiration time in milliseconds                 | `86400000`                              |

### Frontend (`.env.development`, `.env.production`):

| Variable            | Purpose                                         | Example                     |
| ------------------- | ----------------------------------------------- |-----------------------------|
| `REACT_APP_API_URL` | Base URL of the backend API                     | `http://localhost:8000/api` |
| `NODE_ENV`          | React environment (`development`, `production`) | `development`               |

---

## License
This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.