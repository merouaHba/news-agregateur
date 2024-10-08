# news-agregateur

## Table of Contents

1. [Installation and Launch](#installation-and-launch)
2. [Technical Choices and Justification](#technical-choices-and-justification)
3. [Difficulties and Solutions](#difficulties-and-solutions)
4. [Potential Improvements](#potential-improvements)

## Installation and Launch

### Prerequisites

* Node.js (version 14 or higher)
* MongoDB (version 4 or higher)
* A code editor or IDE of your choice

### Installation

1. Clone the repository using Git: `git clone https://github.com/your-username/actualgerie.git`
2. Navigate to the project directory: `cd actualgerie`
3. Install the dependencies: `npm install`
4. Create a new file named `.env` in the backend folder and add the following environment variables:

* `NODE_ENV`: set to `development` or `production`
* `FRONTEND_URL`: set to the URL of your frontend application
* `PORT`: set to the port number you want to use (default is 5000)
* `MONGODB_URI`: set to the URI of your MongoDB database
* `JWT_SECRET`: set to a secret key for JWT authentication
* `JWT_LIFETIME`: set to the lifetime of the JWT token (default is 30 days)
then create another `.env` in the frontend folder and add the following environment variable:
* `VITE_BASE_URL`: set to the URL of your backend application

5. stay in `actualgerie` directory and Start the server: `npm start`

### Launch

1. Open a web browser and navigate to `http://localhost:5173` (or the port number you specified)
2. Use a tool like Postman to test the API endpoints `http://localhost:5000` (or the port number you specified)

## Technical Choices and Justification

### Frontend

* **React**: We chose React as our frontend framework due to its popularity, flexibility, and large community support. React allows us to build reusable UI components and manage state changes efficiently.
* **Vite**: We selected Vite as our build tool due to its fast development server and optimized production builds. Vite provides a seamless development experience and enables us to focus on writing code.
* **React Router**: We used React Router for client-side routing due to its simplicity and flexibility. React Router allows us to define routes and navigate between them easily.
* **React Hooks**: We chose React Hooks for state management due to their simplicity and ease of use. React Hooks provide a way to manage state and side effects in functional components.

### Backend

* **Node.js**: We chose Node.js as our backend runtime environment due to its popularity, performance, and large community support. Node.js allows us to build fast and scalable server-side applications.
* **Express**: We selected Express as our backend framework due to its simplicity, flexibility, and large community support. Express provides a lightweight and modular way to build web applications.
* **MongoDB**: We chose MongoDB as our database due to its flexibility, scalability, and ease of use. MongoDB provides a NoSQL database solution that allows us to store and retrieve data efficiently.
* **JSON Web Tokens**: We used JSON Web Tokens for authentication and authorization due to their simplicity and security. JSON Web Tokens provide a standardized way to authenticate and authorize users.

## Difficulties and Solutions

* **Difficulty**: implementing authentication and authorization using JWT.
  * **Solution**: used the `jsonwebtoken` package to generate and verify JWT tokens, and implemented authentication and authorization middleware using Express.js.
* **Difficulty**: handling errors and exceptions in a robust and scalable way.
  * **Solution**: used the `try-catch` block to catch and handle errors, and implemented a custom error handling middleware using Express.js.
* **Difficulty**: optimizing database queries and performance.
  * **Solution**: used Mongoose's built-in caching and indexing features, and optimized database queries using techniques such as pagination and filtering.

## Potential Improvements

* **Improve database performance**: optimize database queries and performance using techniques such as indexing, caching, and sharding.
* **Add more API endpoints**: implement additional API endpoints for features such as user management, article management, and comment management.
* **Improve code organization and structure**: refactor the code to improve organization and structure, using techniques such as modularization and separation of concerns.
* **Implement caching**: Implementing caching mechanisms, such as Redis or Memcached, to improve the performance of the application.
* **Enhance security**: Enhancing security by implementing additional security measures, such as two-factor authentication and encryption.
* **Improve user experience**: Improving the user experience by adding features, such as real-time updates and personalized recommendations.
* **Optimize database queries**: Optimizing database queries to improve the performance of the application.

* **Add testing**: Adding unit tests and integration tests to ensure the application is stable and reliable.




## API Documentation

The API documentation can be found at `http://localhost:5000/api-docs` 

## Deployement
The application backend is deployed on Render.com, you can access it at `https://news-agregateur.onrender.com`
and the frontend is deployed on Netlify.com, you can access it at `https://news-agregator-rss-feed.netlify.app/`
The database is deployed on MongoDB Atlas