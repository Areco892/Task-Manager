CREATE DATABASE gadget;

CREATE TABLE tasks(
    task_id SERIAL PRIMARY KEY,
    title TEXT NOT NULL,
    completed BOOLEAN DEFAULT false,
    created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE users(
    user_id SERIAL PRIMARY KEY,
    username TEXT NOT NULL UNIQUE,
    email TEXT NOT NULL UNIQUE,
    password TEXT NOT NULL,
    created_at TIMESTAMP DEFAULT NOW()
);