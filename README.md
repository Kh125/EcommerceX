# EcommerceX

EcommerceX is a fully-featured eCommerce platform built with the **MERN** stack (MongoDB, Express.js, React.js, Node.js) that offers user authentication via **JWT** (JSON Web Token). This project demonstrates a scalable architecture with a modern frontend and secure backend to manage products, users, and orders.

## Features

- **User Authentication**: Secure authentication with **JWT** for both users and admin roles.
- **Product Management**: CRUD operations for products, including image uploads, descriptions, and pricing.
- **Order Management**: Users can place orders, track order history, and manage the shopping cart.
- **Responsive Design**: Optimized for mobile and desktop with a modern UI built using **React**.
- **RESTful APIs**: Efficient and scalable API design with **Express.js** and **Node.js** backend.
- **MongoDB Integration**: Robust data management with **MongoDB** for storing user information, products, and orders.

## Tech Stack

- **Frontend**: React.js with React Router for navigation and Redux for state management.
- **Backend**: Node.js and Express.js for RESTful APIs, with JWT-based authentication for securing routes.
- **Database**: MongoDB for scalable NoSQL data storage.
- **Authentication**: JSON Web Tokens (JWT) for user authentication and authorization.

## Architecture

The EcommerX application follows a **client-server architecture** with a separation of concerns between the frontend and backend.

- **Frontend**:
  - React.js handles the user interface with reusable components.
  - React Router for navigation between pages like product listings, cart, and checkout.
  - Redux is utilized for global state management across the application.
  
- **Backend**:
  - Node.js and Express.js manage API requests, handling CRUD operations for products, users, and orders.
  - JWT authentication is implemented to secure API routes, with tokens issued at login and validated on each request.
  - MongoDB is used as the database to store user information, product details, and order history.
