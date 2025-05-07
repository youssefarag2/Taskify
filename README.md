# Taskify: A Full-Stack Task Management Application

Taskify is a comprehensive task management application designed to help users organize their daily activities, track progress, and boost productivity. It features user authentication, task creation, and options to update and delete tasks, all wrapped in a clean and intuitive user interface.

## Screenshots

Below are a few glimpses of the Taskify application:

**Login Page:**
<p align="center">
  <em>Placeholder for Login Page Screenshot</em>
</p>

**Task Dashboard:**
<p align="center">
  <em>Placeholder for Dashboard Screenshot</em>
</p>

## Tech Stack

**Frontend:**
* React 19
* TypeScript
* Vite (Build Tool & Dev Server)
* Tailwind CSS (Styling)
* React Router DOM (Routing)
* React Context API (Authentication State Management)
* `jwt-decode` (for decoding JWTs on the client)

**Backend:**
* Node.js
* Express.js
* TypeScript
* Prisma (ORM for PostgreSQL)
* PostgreSQL (Database)
* JSON Web Tokens (JWT) for Authentication
* `bcrypt` (Password Hashing)
* `cors` (Cross-Origin Resource Sharing)
* `dotenv` (Environment Variable Management)

## Features

* Secure user registration and login with JWT authentication.
* Password hashing for user security.
* Create, Read, Update, and Delete (CRUD) operations for tasks.
* Personalized task dashboard displaying tasks for the logged-in user.
* Responsive design for usability across different screen sizes.
* Client-side routing for a seamless single-page application (SPA) experience.
* Global state management for authentication using React Context.

## Project Structure

The project is organized as a monorepo with distinct frontend and backend directories:

Taskify/
├── backend/        # Node.js, Express, Prisma backend code
│   ├── prisma/     # Prisma schema, migrations, and seed script
│   ├── src/        # Backend source files (controllers, routes, middleware, etc.)
│   ├── .env        # Environment variables (DATABASE_URL, JWT_SECRET, etc.) - Not committed
│   └── package.json
├── frontend/       # React, Vite, Tailwind CSS frontend code
│   ├── src/        # Frontend source files (components, pages, context, etc.)
│   ├── vite.config.ts # Vite configuration (including proxy for development)
│   └── package.json
└── README.md       # This file


## Prerequisites

Before you begin, ensure you have the following installed:
* [Node.js](https://nodejs.org/) (which includes npm) - Version 18.x or higher recommended.
* A running instance of [PostgreSQL](https://www.postgresql.org/).
* [Git](https://git-scm.com/).

## Getting Started

Follow these steps to get the project up and running on your local machine:

**1. Clone the Repository**
   (Replace `<your-repo-url>` with the actual URL if you have one)
   ```bash
   git clone <your-repo-url>
   cd Taskify
2. Backend Setup
Navigate to the backend directory:

Bash

cd backend
Install dependencies:

Bash

npm install
Create a .env file in the backend directory. Copy the contents of .env.example (if it exists) or add the following environment variables, replacing the placeholder values:   

Code snippet

DATABASE_URL="postgresql://YOUR_DB_USER:YOUR_DB_PASSWORD@YOUR_DB_HOST:YOUR_DB_PORT/YOUR_DB_NAME?schema=public"
JWT_SECRET="YOUR_VERY_SECRET_JWT_KEY"
PORT=8000 # Or any port you prefer for the backend
Apply database migrations:

Bash

npx prisma migrate dev
Seed the database with initial data (optional, if prisma/seed.ts is set up):

Bash

npx prisma db seed
Or, if you prefer not to modify package.json for seeding:

Bash

npx ts-node prisma/seed.ts
3. Frontend Setup
Navigate to the frontend directory (assuming it's directly under Taskify and named frontend):

Bash

cd ../frontend
(If your frontend is nested, e.g., client/Taskify-client, adjust the cd command accordingly, like cd ../client/Taskify-client)

Install dependencies:

Bash

npm install
The frontend is configured to proxy API requests starting with /api to http://localhost:8000 (or your backend PORT) during development. This is set up in vite.config.ts.

Running the Application
You need to run both the backend and frontend servers simultaneously in separate terminal windows.

1. Start the Backend Server
Navigate to the backend directory:

Bash

cd backend # If not already there
Start the server:

Bash

npm run dev
The backend server should typically be running on http://localhost:8000 (or the PORT specified in your .env file).

2. Start the Frontend Development Server
Navigate to the frontend directory:

Bash

cd ../frontend # If not already there (relative to backend dir)
Start the server:

Bash

npm run dev
The frontend development server should typically be running on http://localhost:5173. Open this URL in your browser.

API Endpoints (Overview)
User Authentication:

POST /api/users/register: Register a new user.
POST /api/users/login: Log in an existing user.
Tasks (Protected):

GET /api/tasks: Get all tasks for the authenticated user.
POST /api/tasks: Create a new task for the authenticated user.
PUT /api/tasks/:id: Update an existing task by ID for the authenticated user.
DELETE /api/tasks/:id: Delete a task by ID for the authenticated user.
Further Development (TODOs)
Implement the "Edit Task" modal and functionality.
Add "Complete/Mark Incomplete" functionality for tasks.
Implement "Create Task" form/modal.
Add more robust error handling and user feedback.
Implement additional task views (e.g., "Today", "Upcoming", "Completed").
Add form validation for all input fields.
Enhance UI/UX and accessibility.

**How to Use This:**

1.  Create a new file named `README.md` in the root of your `Taskify` project directory (the same level as your `backend` and `frontend` folders).
2.  Copy the entire content above and paste it into your `README.md` file.
3.  **Replace Placeholders:**
    * Update `<your-repo-url>` if you have a Git repository hosted online.
    * Correct the paths in `cd` commands if your `frontend` folder has a different name or nesting (e.g., `client/Taskify-client`). I've used `frontend` for simplicity, but adjust if needed.
    * Update the `DATABASE_URL` example in the `.env` section with your specific placeholders or an actual example structure if you prefer.
    * **Most importantly, add your actual image links in the "Screenshots" section.** You can upload your images to the repository (e.g., in an `assets` or `docs/images` folder) and then link to them like: `![Login Page](./docs/images/login.png)`.

This README should give a good overview of your project!
