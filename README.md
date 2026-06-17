# Scalora Full-Stack Website

Professional full-stack agency website for Scalora, built with React, Vite, Tailwind CSS, Java Spring Boot, Spring Security, JWT authentication, PostgreSQL, JPA/Hibernate, validation, clean API errors, and admin content management.

## Project Structure

```text
scalora-pro_website/
  frontend/              React + Vite + Tailwind website and admin UI
  backend/               Spring Boot REST API
  docker-compose.yml     Local PostgreSQL database
```

## Features

- Responsive agency website: Home, About, Services, Portfolio, Contact, Testimonials, CTA sections
- Contact form API that stores leads in PostgreSQL
- WhatsApp and social links
- Admin login with JWT
- Admin dashboard to view leads and update status: `NEW`, `CONTACTED`, `CLOSED`, `REJECTED`
- Admin CRUD for services, projects, and testimonials
- Public API exposes only public website content
- Layered backend: controllers, services, repositories, DTOs, entities, security, config, exceptions
- Environment-based secrets and CORS
- Global exception handling with clean JSON errors

## Requirements

- Node.js 20+
- npm 10+
- Java 17+
- Maven 3.9+
- Docker Desktop, or a local PostgreSQL server

Maven is not installed on this machine at the time this project was generated, so backend compilation could not be verified locally here.

## Local Setup

### 1. Start PostgreSQL

```bash
docker compose up -d
```

### 2. Configure Backend

Create `backend/.env` from `backend/.env.example`, or export the variables in your terminal:

```bash
JDBC_DATABASE_URL=jdbc:postgresql://localhost:5432/scalora
DATABASE_USERNAME=postgres
DATABASE_PASSWORD=postgres
JWT_SECRET=replace-with-a-long-strong-secret-at-least-32-bytes
JWT_EXPIRATION_MINUTES=1440
CORS_ALLOWED_ORIGINS=http://localhost:5173
ADMIN_EMAIL=admin@scalora.com
ADMIN_PASSWORD=ChangeMe123!
```

### Railway PostgreSQL

If you use PostgreSQL on Railway, add the Railway Postgres service to your project and set these backend environment variables from Railway's database variables:

```bash
PGHOST=<Railway PGHOST>
PGPORT=<Railway PGPORT>
PGDATABASE=<Railway PGDATABASE>
PGUSER=<Railway PGUSER>
PGPASSWORD=<Railway PGPASSWORD>
JWT_SECRET=replace-with-a-long-strong-secret-at-least-32-bytes
JWT_EXPIRATION_MINUTES=1440
CORS_ALLOWED_ORIGINS=http://localhost:5173
ADMIN_EMAIL=admin@scalora.com
ADMIN_PASSWORD=ChangeMe123!
```

You can also provide one explicit JDBC URL instead:

```bash
JDBC_DATABASE_URL=jdbc:postgresql://<host>:<port>/<database>
```

Run the backend:

```bash
cd backend
mvn spring-boot:run
```

The API runs at:

```text
http://localhost:8080/api
```

On first launch, the API seeds:

- Admin user from `ADMIN_EMAIL` and `ADMIN_PASSWORD`
- Starter services
- Starter projects
- Starter testimonials

### 3. Configure Frontend

Create `frontend/.env` from `frontend/.env.example`:

```bash
VITE_API_BASE_URL=http://localhost:8080/api
VITE_WHATSAPP_NUMBER=96100000000
VITE_INSTAGRAM_URL=https://instagram.com/scalora
VITE_LINKEDIN_URL=https://linkedin.com/company/scalora
```

Run the frontend:

```bash
cd frontend
npm install
npm run dev
```

The website runs at:

```text
http://localhost:5173
```

Open the admin dashboard from the site header, or use `#admin`.

## API Endpoints

### Public

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/public/content` | Public services, projects, testimonials |
| `POST` | `/api/leads` | Submit contact form lead |
| `POST` | `/api/auth/login` | Admin login, returns JWT |

### Admin

All admin routes require:

```text
Authorization: Bearer <token>
```

| Method | Endpoint | Description |
| --- | --- | --- |
| `GET` | `/api/admin/leads` | List all leads |
| `PATCH` | `/api/admin/leads/{id}/status` | Update lead status |
| `GET` | `/api/admin/services` | List services |
| `POST` | `/api/admin/services` | Create service |
| `PUT` | `/api/admin/services/{id}` | Update service |
| `DELETE` | `/api/admin/services/{id}` | Delete service |
| `GET` | `/api/admin/projects` | List projects |
| `POST` | `/api/admin/projects` | Create project |
| `PUT` | `/api/admin/projects/{id}` | Update project |
| `DELETE` | `/api/admin/projects/{id}` | Delete project |
| `GET` | `/api/admin/testimonials` | List testimonials |
| `POST` | `/api/admin/testimonials` | Create testimonial |
| `PUT` | `/api/admin/testimonials/{id}` | Update testimonial |
| `DELETE` | `/api/admin/testimonials/{id}` | Delete testimonial |

## Example Requests

Login:

```bash
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"admin@scalora.com","password":"ChangeMe123!"}'
```

Create lead:

```bash
curl -X POST http://localhost:8080/api/leads \
  -H "Content-Type: application/json" \
  -d '{"name":"Client","email":"client@example.com","phone":"+96100000000","company":"Brand","projectType":"Shopify Website","message":"We need a premium store."}'
```

## Production Notes

- Replace `JWT_SECRET` and `ADMIN_PASSWORD` before deployment.
- Set `spring.jpa.hibernate.ddl-auto=validate` in production and use a migration tool such as Flyway or Liquibase.
- Restrict `CORS_ALLOWED_ORIGINS` to the production frontend domain.
- Put the backend behind HTTPS.
- Use managed PostgreSQL with backups.
- Store environment variables in the host or deployment platform secret manager.

## Railway Backend Deploy

This repository is a monorepo, so Railway needs to know that the deploy target is the Spring Boot backend. The root `nixpacks.toml` builds:

```bash
cd backend && mvn -DskipTests clean package
```

and starts:

```bash
java -jar backend/target/scalora-api-1.0.0.jar
```

Set these Railway variables on the backend service:

```bash
PGHOST=<Railway PGHOST>
PGPORT=<Railway PGPORT>
PGDATABASE=<Railway PGDATABASE>
PGUSER=<Railway PGUSER>
PGPASSWORD=<Railway PGPASSWORD>
JWT_SECRET=<long-secret-at-least-32-characters>
JWT_EXPIRATION_MINUTES=1440
CORS_ALLOWED_ORIGINS=<your-frontend-domain>
ADMIN_EMAIL=admin@scalora.com
ADMIN_PASSWORD=<strong-admin-password>
```
