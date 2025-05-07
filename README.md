# Taskify: A Full-Stack Task Management Application

Taskify is a comprehensive task management application designed to help users organize their daily activities, track progress, and boost productivity. It features user authentication, task creation, and options to update and delete tasks, all wrapped in a clean and intuitive user interface.

## Screenshots

Below are a few glimpses of the Taskify application:

**Login Page:**
<p align="center">
  <em>(Your Login Page Screenshot Will Go Here)</em>
</p>

**Task Dashboard:**
<p align="center">
  <em>(Your Task Dashboard Screenshot Will Go Here)</em>
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

The project is organized as a monorepo with distinct frontend and backend directories

## Getting Started

Follow these steps to get the project up and running on your local machine:

**1. Clone the Repository**
   (Replace `<your-repo-url>` with the actual URL if you have one)
   ```bash
   git clone <your-repo-url>
   cd Taskify
  ```
**2. Backend Setup:**  

  Install dependencies:
  ```bash
  npm install
  ```
Create a `.env` file in the backend directory. You can copy .env.example if one exists, or create a new one. Add the following environment variables, replacing the placeholder values with your actual credentials and settings:
```bash
DATABASE_URL="postgresql://YOUR_DB_USER:YOUR_DB_PASSWORD@YOUR_DB_HOST:YOUR_DB_PORT/YOUR_DB_NAME?schema=public"
JWT_SECRET="YOUR_VERY_SECRET_JWT_KEY_SHOULD_BE_LONG_AND_RANDOM"
PORT=8000 # Or any port you prefer for the backend
```
Apply database migrations to set up the schema:
```bash
npx prisma migrate dev
```

**3. Frontend Setup**  

Navigate to the frontend directory
```bash
cd ../client/Taskify-client
```

Install dependencies:
```bash
npm install
```
## Running the Application  

in the root directory run:
```bash
npm run dev
```
then,
```bash
cd client/Taskify-client
npm run dev
```

