# Task Manager

## Project Overview
This Task Manager allows user to create, read, update, and delete tasks. It implements a client-server architecture with a RESTful API for managing tasks. The frontend is built with basic HTML, CSS, JavaScript, while the backend is powered by Node.js with Express.js and connected to a PostgreSQL database.

### Features:
- Create new todo tasks
- Read and view all tasks
- Update task descriptions and completion status
- Delete tasks
- Completion status can be toggled using checkboxes

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