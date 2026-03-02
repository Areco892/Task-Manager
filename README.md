# Task Manager

## Project Overview
A RESTful API for managing tasks, built with a layered architecture (Routes -> Controllers -> Services -> Models). Supports full CRUD operations with persistent storage backed by PostgreSQL. Designed with separation of concerns, centralized error handling, and ownership enforcement so users can only only access their own data.

### Features:
- Create, read, update, and delete tasks
- Tasks are scoped to a user via foreign key relationship
- JOIN queries return task data with owner information
- Input validation middleware on write operations
- Centralized error handling with consistent JSON error shapes
- Request logging and timing middleware

### Usage
- Open the frontend (index.html) in your browser.
- Use the form to add a new task to your todo list.
- Mark tasks as complete/incomplete using the checkboxes.
- Edit tasks by changing the description.
- Delete tasks from the list.

## Tech Stack
- Runtime: Node.js
- Framework: Express
- Language: TypeScript
- Storage: PostgreSQL

## Project Structure
```
src/
├── index.ts                  # Server setup, middleware, error handler
├── routes/
│   └── tasks.routes.ts       # Route definitions
├── controllers/
│   └── tasks.controller.ts   # Request/response handling
├── services/
│   └── tasks.service.ts      # Business logic
├── models/
│   └── tasks.model.ts        # SQL queries
├── middleware/
│   └── index.ts              # Logger, timer, validator, error handler
├── errors/
│   └── AppError.ts           # Custom error class
├── db/
│   └── client.ts             # PostgreSQL connection pool
└── types/
    └── index.ts              # Shared TypeScript interfaces
```


## Database Schema

```sql
CREATE TABLE users (
  user_id   SERIAL PRIMARY KEY,
  username  TEXT NOT NULL UNIQUE,
  email     TEXT NOT NULL UNIQUE,
  password  TEXT NOT NULL,
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE tasks (
  task_id    SERIAL PRIMARY KEY,
  title      TEXT NOT NULL,
  completed  BOOLEAN DEFAULT false,
  user_id    INT REFERENCES users(user_id) ON DELETE CASCADE,
  created_at TIMESTAMP DEFAULT NOW()
);
```

## Getting Started
**Prerequisites**
- Node.js v18+
- npm
- PostgreSQL

### Installation
```
git clone git@github.com:Areco892/Task-Manager.git
cd Task-Manager
npm install
```

**Environment Setup**

Create a `.env` file in the project root:

```
DATABASE_URL=postgresql://localhost:5432/task_manager
```

**Run Database Setup**

```bash
psql task_manager < schema.sql
```

**Start the Server**

```bash
npm run dev
```

The server runs on http://localhost:5000

## API Reference
### Base URL
`http://localhost:5000`

### Task Object

```json
{
  "task_id": 1,
  "title": "Buy groceries",
  "completed": false,
  "user_id": 1,
  "created_at": "2026-03-01T14:48:08.411Z"
}
```

### Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/tasks` | Get all tasks for a user |
| GET | `/tasks/:id` | Get a single task |
| POST | `/tasks` | Create a new task |
| PATCH | `/tasks/:id` | Update a task (partial update supported) |
| DELETE | `/tasks/:id` | Delete a task |

**GET /tasks**
```bash
curl http://localhost:5000/tasks
```

**GET /tasks/:id**
```bash
curl http://localhost:5000/tasks/1
```

**POST /tasks**
```bash
curl -X POST http://localhost:5000/tasks \
     -H "Content-Type: application/json" \
     -d '{"title": "Buy groceries"}'
```

**PATCH /tasks/:id**
```bash
curl -X PATCH http://localhost:5000/tasks/1 \
     -H "Content-Type: application/json" \
     -d '{"completed": true}'
```

**DELETE /tasks/:id**
```bash
curl -X DELETE http://localhost:5000/tasks/1
```
## Error Handling
All errors follow this shape:
`{ "message": "Description of what went wrong" }`.

## Roadmap
- [X] Migrate from in-memory storage to PostgreSQL
- [ ] Add user authentication (JWT + bcrypt)
- [ ] Protect routes with auth middleware
- [ ] Add task priority levels
- [ ] Migrate to Prisma ORM
- [ ] Deploy to Railway or Render



