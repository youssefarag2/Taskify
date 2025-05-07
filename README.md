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
**2. Backend Setup
  Install dependencies:
  ```bash
  npm install
  ```
