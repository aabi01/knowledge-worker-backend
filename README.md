## Description

Knowledge Worker Backend - A NestJS-based API repository for managing and querying various APIs, books, movies, and more.

## Quick Start Guide

### 1. Prerequisites

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.example .env
# Edit .env with your database credentials
```

### 2. Database Setup

```bash
# Run database migrations
npm run migration:run

# Seed the database with initial data
npm run seed
```

### 3. Start the Application

```bash
# Development mode
npm run start:dev
```

### 4. Available API Endpoints

- **API Repository**

  - GET `/api-repository` - List all APIs
  - GET `/api-repository/:id` - Get API by ID

- **Books**

  - GET `/books` - List all books

- **Movies**

  - GET `/movies` - List all movies

- **Queries**
  - GET `/queries` - List all queries
  - POST `/queries` - Create a new query
  - GET `/queries/:id` - Get query by ID

### 5. Development Workflow

#### Running Tests

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e
```

#### Database Management

```bash
# Run migrations
npm run migration:run

# Seed database
npm run seed
```

## Project Structure

```
src/
├── api/                    # API modules
│   ├── api-repository/     # API Repository module
│   ├── books/             # Books module
│   ├── movies/            # Movies module
│   └── queries/           # Queries module
├── config/                # Configuration files
├── database/              # Database related files
│   ├── migrations/        # Database migrations
│   └── seeders/          # Database seeders
└── main.ts               # Application entry point
```
