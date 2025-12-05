# Natours Express API

![Natours Banner](https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80)

A robust RESTful API for managing tours, users, reviews, bookings, and geospatial queries. Built with Node.js, Express, MongoDB, Mongoose, and Stripe.

---

## 📋 Table of Contents

- [Features](#features)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [Authentication](#authentication)
- [API Endpoints](#api-endpoints)
  - [Users & Authentication](#users--authentication)
  - [Tours](#tours)
  - [Reviews](#reviews)
  - [Bookings & Payments](#bookings--payments)
  - [Admin Tools](#admin-tools)
- [Query Features](#query-features)
- [Testing & Scripts](#testing--scripts)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

---

## ✨ Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control (user, guide, lead-guide, admin)
- **CRUD Operations**: Complete Create, Read, Update, Delete operations for tours, users, reviews, and bookings
- **Advanced Querying**: Filtering, sorting, pagination, and field selection
- **Geospatial Queries**: Find tours within a radius and calculate distances from any point
- **Aggregation Pipeline**: Tour statistics and monthly planning with MongoDB aggregation
- **Security**: Data sanitization, security headers (helmet), rate limiting, and XSS protection
- **Password Management**: Secure password reset flow with email tokens
- **User Self-Management**: Users can update their own data and deactivate accounts
- **Nested Routes**: Tour-specific review endpoints
- **Custom Error Handling**: Comprehensive error handling with meaningful messages
- **Test Data Generation**: Pre-request scripts for automated test tour creation
- **Stripe Payments**: Secure online payments and booking creation via Stripe Checkout
- **Booking Management**: Bookings are created after successful payment
- **Frontend Integration**: Stripe.js integration for seamless checkout

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) cluster or local MongoDB
- [Mailtrap](https://mailtrap.io/) sandbox environment for email testing
- [Stripe](https://stripe.com/) account for payment integration

### Installation

```bash
# Clone the repo
git clone https://github.com/yourusername/natours-express-api.git
cd natours-express-api

# Install dependencies
npm install
```

### Configuration

Edit `src/config.env` with your credentials:

```env
NODE_ENV=development
PORT=3000
DATABASE=mongodb+srv://<user>:<PASSWORD>@<cluster>.mongodb.net/natours?retryWrites=true&w=majority
DATABASE_PASSWORD=your_db_password
JWT_SECRET=your_jwt_secret
JWT_EXPIRES_IN=90d
JWT_COOKIE_EXPIRES_IN=90
EMAIL_USERNAME=your_mailtrap_username
EMAIL_PASSWORD=your_mailtrap_password
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=25
MAILTRAP_TOKEN=your_mailtrap_token
STRIPE_SECRET_KEY=your_stripe_secret_key
STRIPE_PUBLIC_KEY=your_stripe_public_key
EMAIL_FROM=your_email_from_address
```

### Running the App

```bash
# Production mode
npm start

# Development mode with auto-reload
npm run dev
```

The API will be available at `http://127.0.0.1:3000`

---

## 🔐 Environment Variables

The collection uses the following environment variables:
| Variable | Description | Example |
|----------|-------------|---------|
| `URL` | Base API URL | `http://127.0.0.1:3000/` |
| `token` | JWT token for authenticated user | Auto-set after login |
| `AdminToken` | JWT token for admin user | Auto-set after admin login |
| `userName` | Test user name | `John Doe` |
| `userEmail` | Test user email | `testuser@example.com` |
| `userPassword` | Test user password | `testpass123` |
| `userPasswordConfirm` | Password confirmation | `testpass123` |
| `globalTourId` | Last created tour ID | Auto-set by scripts |
| `globalUserId` | Last created user ID | Auto-set by scripts |
| `STRIPE_PUBLIC_KEY` | Stripe public key for frontend | `pk_test_...` |

**Note**: Tokens are automatically set in the environment after successful login via post-response scripts.

---

## 🔑 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication. Tokens are sent via:

- **Authorization header**: `Bearer <token>`
- **HTTP-only cookies** (for browser-based clients)

### Authentication Levels

| Badge          | Description                         | Required Role                  |
| -------------- | ----------------------------------- | ------------------------------ |
| 🔓 **Public**  | No authentication required          | None                           |
| 🔒 **Private** | Authentication required             | User, Guide, Lead-Guide, Admin |
| 👤 **Self**    | User can only modify their own data | User (self)                    |
| 🛡️ **Admin**   | Admin or Lead-Guide only            | Admin, Lead-Guide              |

---

## 📡 API Endpoints

### Users & Authentication

#### Auth - Public 🔓

| Method  | Endpoint                             | Description                        |
| ------- | ------------------------------------ | ---------------------------------- |
| `POST`  | `/api/v1/users/signup`               | Register a new user                |
| `POST`  | `/api/v1/users/login`                | Login and receive JWT token        |
| `POST`  | `/api/v1/users/forgotPassword`       | Request password reset email       |
| `PATCH` | `/api/v1/users/resetPassword/:token` | Reset password with token          |
| `PATCH` | `/api/v1/users/updatePassword`       | Update password (authenticated) 🔒 |

#### Self - Private 👤

| Method   | Endpoint                 | Description                            |
| -------- | ------------------------ | -------------------------------------- |
| `GET`    | `/api/v1/users/me`       | Get current user profile               |
| `PATCH`  | `/api/v1/users/updateMe` | Update current user data (name, email) |
| `DELETE` | `/api/v1/users/deleteMe` | Deactivate current user account        |

---

### Tours

#### Tours - Public 🔓

| Method | Endpoint                                                         | Description                                             |
| ------ | ---------------------------------------------------------------- | ------------------------------------------------------- |
| `GET`  | `/api/v1/tours`                                                  | Get all tours (supports filtering, sorting, pagination) |
| `GET`  | `/api/v1/tours/:id`                                              | Get a single tour by ID                                 |
| `GET`  | `/api/v1/tours/cheap`                                            | Get top 5 cheapest tours (alias route)                  |
| `GET`  | `/api/v1/tours/tours-within/:distance/center/:latlng/unit/:unit` | Find tours within radius                                |
| `GET`  | `/api/v1/tours/distances/:latlng/unit/:unit`                     | Calculate distances from point                          |

#### Tours - Private 🛡️

| Method   | Endpoint                           | Description                       | Required Role            |
| -------- | ---------------------------------- | --------------------------------- | ------------------------ |
| `POST`   | `/api/v1/tours`                    | Create a new tour                 | Admin, Lead-Guide        |
| `PATCH`  | `/api/v1/tours/:id`                | Update a tour                     | Admin, Lead-Guide        |
| `DELETE` | `/api/v1/tours/:id`                | Delete a tour                     | Admin, Lead-Guide        |
| `GET`    | `/api/v1/tours/stats/:id`          | Get tour statistics (aggregation) | Admin, Lead-Guide        |
| `GET`    | `/api/v1/tours/monthly-plan/:year` | Get monthly tour plan             | Admin, Lead-Guide, Guide |

---

### Reviews

#### Reviews - Public 🔓

| Method | Endpoint              | Description               |
| ------ | --------------------- | ------------------------- |
| `GET`  | `/api/v1/reviews`     | Get all reviews           |
| `GET`  | `/api/v1/reviews/:id` | Get a single review by ID |

#### Reviews - Private 🔒

| Method   | Endpoint              | Description     | Required Role        |
| -------- | --------------------- | --------------- | -------------------- |
| `POST`   | `/api/v1/reviews`     | Create a review | User                 |
| `PATCH`  | `/api/v1/reviews/:id` | Update a review | User (author), Admin |
| `DELETE` | `/api/v1/reviews/:id` | Delete a review | User (author), Admin |

#### Tour-Specific Reviews

| Method | Endpoint                        | Description                            |
| ------ | ------------------------------- | -------------------------------------- |
| `GET`  | `/api/v1/tours/:tourId/reviews` | Get all reviews for a specific tour 🔓 |
| `POST` | `/api/v1/tours/:tourId/reviews` | Create a review for a specific tour 🔒 |

---

### Bookings & Payments

#### Bookings - Private 🔒

| Method | Endpoint                                    | Description                                     | Required Role |
| ------ | ------------------------------------------- | ----------------------------------------------- | ------------- |
| `GET`  | `/api/v1/bookings/checkout-session/:tourID` | Create Stripe checkout session for a tour       | User          |
| `GET`  | `/api/v1/bookings`                          | Get all bookings for authenticated user         | User          |
| `POST` | `/api/v1/bookings`                          | Create a booking (admin only, or after payment) | Admin         |

#### Stripe Integration

- **Stripe Checkout**: Secure payment flow for booking tours
- **Frontend**: Stripe.js loaded globally, used in `stripe.mjs` for redirecting to checkout
- **Environment**: Public key is injected from server to frontend
- **Booking Creation**: Booking is created after successful payment via query params (for demo, not secure for production)

---

### Admin Tools

#### Admin - Private 🛡️

| Method   | Endpoint              | Description                                |
| -------- | --------------------- | ------------------------------------------ |
| `GET`    | `/api/v1/users`       | Get all users (supports filtering by role) |
| `PATCH`  | `/api/v1/users/:id`   | Update any user                            |
| `DELETE` | `/api/v1/users/:id`   | Delete any user                            |
| `POST`   | `/api/v1/users/login` | Admin login                                |

---

## 🔍 Query Features

The API supports advanced querying on collection endpoints (tours, reviews, users):

- Filtering
- Sorting
- Field Limiting
- Pagination
- Combining features

---

## 🧪 Testing & Scripts

- Pre-request scripts for test data generation
- Post-response scripts for saving tokens and IDs
- Use Postman Collection Runner for automated testing

---

## 📊 Example Responses

- See previous documentation for detailed examples

---

## 🛠️ Technology Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose ODM
- **Authentication**: JWT (jsonwebtoken)
- **Security**: Helmet, express-rate-limit, express-mongo-sanitize, xss-clean
- **Email**: Nodemailer with Mailtrap
- **Validation**: Validator.js
- **Geospatial**: MongoDB geospatial queries
- **Payments**: Stripe

---

## 📝 API Response Format

All API responses follow this structure:
**Success Response:**

```json
{
  "status": "success",
  "results": 10,  // For array responses
  "data": {
    "tours": [...]  // or "tour", "user", "review", etc.
  }
}
```

**Error Response:**

```json
{
  "status": "fail", // or "error" for server errors
  "message": "Error description"
}
```

---

## 🤝 Contributing

The whole idea of this project is for me to learn, so it will not be open to third-party contributions.

---

## 📄 License

Free as in freedom—fork it, modify it, do whatever you want with it. It's made for learning purposes.

---

## 🙏 Credits

- [Jonas Schmedtmann's Node.js Bootcamp](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/) - The course that inspired this project
- [Unsplash](https://unsplash.com/) - For the beautiful banner image
- [Postman](https://www.postman.com/)
- [Obsidian](https://obsidian.md/) - For being a great note-taking tool. Check out [my notes](https://github.com/C4S4BL4NC4/natours-express-api/tree/main/obsidian/vaults) too!

---

## 📌 Quick Reference

### Base URL

```
http://127.0.0.1:3000/api/v1
```

### Authentication Header

```
Authorization: Bearer <your_jwt_token>
```

### Common Status Codes

- `200` - Success
- `201` - Created
- `204` - No Content (successful deletion)
- `400` - Bad Request
- `401` - Unauthorized
- `403` - Forbidden
- `404` - Not Found
- `500` - Internal Server Error

---

## 📚 Additional Resources

- [Postman Collection](https://github.com/C4S4BL4NC4/natours-express-api/tree/main/src/dev-data/postman) - Import this collection to get started immediately
- [GitHub Repository](https://github.com/C4S4BL4NC4/natours-express-api) - Source code and additional notes

---

**NOTE: MY DOCUMENTATION WAS FULLY IMPLEMENTED WITH POSTMAN AND REFINED USING AI TOOLS.**
