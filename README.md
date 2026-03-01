# Task Manager
A RESTful API built with Node.js, Express, and TypeScript for managing tasks.

## Tech Stack
- Runtime: Node.js
- Framework: Express
- Language: TypeScript
- Storage: In-memory (PostgreSQL in further update)

## Project Structure
```
task-manager-api/
├── src/
│   ├── index.ts              # Entry point — server setup, middleware, error handling
│   ├── routes/
│   │   └── tasks.ts          # Task route handlers
│   ├── middleware/
│   │   └── index.ts          # Logger, timer, validator middleware
│   ├── errors/
│   │   └── AppError.ts       # Custom error class
│   └── types/
│       └── index.ts          # Shared TypeScript interfaces
├── tsconfig.json
├── package.json
└── README.md
```

## Getting Started
Prerequisites
- Node.js v18+
- npm

### Installation
```
git clone git@github.com:Areco892/Task-Manager.git
cd Task-Manager
npm install
```
### Running the server
`npm run dev`

The server runs on http://localhost:3000

## API Reference
### Base URL
`http://localhost:3000`

### Task Object
```
{
    "id" : 1,
    "title": "Clean the room",
    "description": "Wipe the desk",
    "completed": false
}
```
### Endpoints
- Get all tasks `GET /tasks`.

  Example Request:
  ```
  curl http://localhost:3000/tasks
  ```

- Get a single taks `GET /tasks/:id`.

  Example Request:
  ```
  curl http://localhost:3000/tasks/1
  ```

- Create a task `POST /tasks`.

  Example Request:
  ```
  curl  -X POST http://localhost:3000/tasks \
        -H "Content-Type: application/json \
        -d '{"title": "Buy groceries", "description": "Milk, eggs, bread"}'
  ```

- Complete task `PATCH /tasks/:id`.

  Example Request:
  ```
  curl -X PATCH http://localhost:3000/tasks/1
  ```

- Delete task `DELETE /tasks/:id`.

  Example Request:
  ```
  curl -X DELETE http://localhost:3000/tasks/1
  ```

## Error Handling
All errors follow this shape:
`{ "message": "Description of what went wrong" }`.

## Roadmap
- Migrate from in-memory storage to PostgreSQL
- Add user authentication (JWT)
- Add task priority levels