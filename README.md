# Natours Express API

![Natours Banner](https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80)

A robust RESTful API for managing tours, users, reviews, and geospatial queries. Built with Node.js, Express, MongoDB, and Mongoose.

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
  - [Admin Tools](#admin-tools)
- [Query Features](#query-features)
- [Testing & Scripts](#testing--scripts)
- [Contributing](#contributing)
- [License](#license)
- [Credits](#credits)

---

## ✨ Features

- **Authentication & Authorization**: JWT-based authentication with role-based access control (user, guide, lead-guide, admin)
- **CRUD Operations**: Complete Create, Read, Update, Delete operations for tours, users, and reviews
- **Advanced Querying**: Filtering, sorting, pagination, and field selection
- **Geospatial Queries**: Find tours within a radius and calculate distances from any point
- **Aggregation Pipeline**: Tour statistics and monthly planning with MongoDB aggregation
- **Security**: Data sanitization, security headers (helmet), rate limiting, and XSS protection
- **Password Management**: Secure password reset flow with email tokens
- **User Self-Management**: Users can update their own data and deactivate accounts
- **Nested Routes**: Tour-specific review endpoints
- **Custom Error Handling**: Comprehensive error handling with meaningful messages
- **Test Data Generation**: Pre-request scripts for automated test tour creation

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- [MongoDB Atlas](https://www.mongodb.com/products/platform/atlas-database) cluster or local MongoDB
- [Mailtrap](https://mailtrap.io/) sandbox environment for email testing

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

**Note**: Tokens are automatically set in the environment after successful login via post-response scripts.

---

## 🔑 Authentication

The API uses **JWT (JSON Web Tokens)** for authentication. Tokens are sent via:
- **Authorization header**: `Bearer <token>`
- **HTTP-only cookies** (for browser-based clients)

### Authentication Levels

| Badge | Description | Required Role |
|-------|-------------|---------------|
| 🔓 **Public** | No authentication required | None |
| 🔒 **Private** | Authentication required | User, Guide, Lead-Guide, Admin |
| 👤 **Self** | User can only modify their own data | User (self) |
| 🛡️ **Admin** | Admin or Lead-Guide only | Admin, Lead-Guide |

---

## 📡 API Endpoints

### Users & Authentication

#### Auth - Public 🔓

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/v1/users/signup` | Register a new user |
| `POST` | `/api/v1/users/login` | Login and receive JWT token |
| `POST` | `/api/v1/users/forgotPassword` | Request password reset email |
| `PATCH` | `/api/v1/users/resetPassword/:token` | Reset password with token |
| `PATCH` | `/api/v1/users/updatePassword` | Update password (authenticated) 🔒 |

**Signup Request Example:**
```json
POST /api/v1/users/signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "pass1234",
  "passwordConfirm": "pass1234"
}
```

**Login Request Example:**
```json
POST /api/v1/users/login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "pass1234"
}
```

**Response:**
```json
{
  "status": "success",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "data": {
    "user": {
      "_id": "5c8a1d5b0190b214360dc057",
      "name": "John Doe",
      "email": "john@example.com",
      "role": "user"
    }
  }
}
```

**Forgot Password Flow:**
```json
// Step 1: Request reset token
POST /api/v1/users/forgotPassword
{
  "email": "john@example.com"
}

// Step 2: Reset password with token from email
PATCH /api/v1/users/resetPassword/3a1d035ef813c0b817baad920aa33cd8e31fcca632f0ed8133c4816d9c84e9ae
{
  "password": "newpass1234",
  "passwordConfirm": "newpass1234"
}
```

#### Self - Private 👤

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/users/me` | Get current user profile |
| `PATCH` | `/api/v1/users/updateMe` | Update current user data (name, email) |
| `DELETE` | `/api/v1/users/deleteMe` | Deactivate current user account |

**Update Me Example:**
```json
PATCH /api/v1/users/updateMe
Authorization: Bearer <token>
Content-Type: application/json

{
  "name": "John Updated",
  "email": "johnupdated@example.com"
}
```

**Note**: `updateMe` only allows updating non-sensitive fields (name, email). Use `updatePassword` for password changes.

---

### Tours

#### Tours - Public 🔓

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/tours` | Get all tours (supports filtering, sorting, pagination) |
| `GET` | `/api/v1/tours/:id` | Get a single tour by ID |
| `GET` | `/api/v1/tours/cheap` | Get top 5 cheapest tours (alias route) |
| `GET` | `/api/v1/tours/tours-within/:distance/center/:latlng/unit/:unit` | Find tours within radius |
| `GET` | `/api/v1/tours/distances/:latlng/unit/:unit` | Calculate distances from point |

**Get All Tours:**
```
GET /api/v1/tours
```

**Get Tour by ID:**
```
GET /api/v1/tours/5c88fa8cf4afda39709c2961
```

**Top 5 Cheap Tours (Alias):**
```
GET /api/v1/tours/cheap
```
This is an alias route that automatically applies: `?limit=5&sort=price&fields=name,price,duration,difficulty`

**Tours Within Radius:**
```
GET /api/v1/tours/tours-within/200/center/34.111745,-118.113491/unit/mi
```
- `distance`: Radius in specified unit
- `latlng`: Center point coordinates (latitude,longitude)
- `unit`: `mi` (miles) or `km` (kilometers)

**Get Distances to Tours:**
```
GET /api/v1/tours/distances/34.111745,-118.113491/unit/km
```
Returns distances from the specified point to all tours.

#### Tours - Private 🛡️

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|---------------|
| `POST` | `/api/v1/tours` | Create a new tour | Admin, Lead-Guide |
| `PATCH` | `/api/v1/tours/:id` | Update a tour | Admin, Lead-Guide |
| `DELETE` | `/api/v1/tours/:id` | Delete a tour | Admin, Lead-Guide |
| `GET` | `/api/v1/tours/stats/:id` | Get tour statistics (aggregation) | Admin, Lead-Guide |
| `GET` | `/api/v1/tours/monthly-plan/:year` | Get monthly tour plan | Admin, Lead-Guide, Guide |

**Create Tour Example:**
```json
POST /api/v1/tours
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "name": "Grand Canyon Exploration Hike",
  "duration": 11,
  "maxGroupSize": 7,
  "difficulty": "medium",
  "price": 1358,
  "summary": "Experience the amazing Grand Canyon with breathtaking views",
  "description": "Detailed tour description...",
  "imageCover": "grandcanyon.jpg",
  "startLocation": {
    "type": "Point",
    "coordinates": [-112.1401, 36.0544],
    "address": "Grand Canyon, AZ, USA",
    "description": "Main entrance"
  }
}
```

**Tour Stats Example:**
```
GET /api/v1/tours/stats/123123
Authorization: Bearer <admin_token>
```
Returns aggregated statistics like average price, ratings, min/max prices, etc.

**Monthly Plan Example:**
```
GET /api/v1/tours/monthly-plan/2021
Authorization: Bearer <token>
```
Returns tours grouped by month for the specified year.

---

### Reviews

#### Reviews - Public 🔓

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/reviews` | Get all reviews |
| `GET` | `/api/v1/reviews/:id` | Get a single review by ID |

#### Reviews - Private 🔒

| Method | Endpoint | Description | Required Role |
|--------|----------|-------------|---------------|
| `POST` | `/api/v1/reviews` | Create a review | User |
| `PATCH` | `/api/v1/reviews/:id` | Update a review | User (author), Admin |
| `DELETE` | `/api/v1/reviews/:id` | Delete a review | User (author), Admin |

**Create Review Example:**
```json
POST /api/v1/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "review": "Amazing tour! Highly recommended.",
  "rating": 5,
  "tour": "5c88fa8cf4afda39709c2955",
  "user": "5c8a1d5b0190b214360dc057"
}
```

#### Tour-Specific Reviews

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/tours/:tourId/reviews` | Get all reviews for a specific tour 🔓 |
| `POST` | `/api/v1/tours/:tourId/reviews` | Create a review for a specific tour 🔒 |

**Get Reviews for a Tour:**
```
GET /api/v1/tours/5c88fa8cf4afda39709c2961/reviews
```

**Create Review for a Tour:**
```json
POST /api/v1/tours/5c88fa8cf4afda39709c295a/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "review": "Fantastic experience!",
  "rating": 5
}
```
**Note**: The tour ID is automatically extracted from the URL, and the user ID is taken from the authenticated user.

---

### Admin Tools

#### Admin - Private 🛡️

| Method | Endpoint | Description |
|--------|----------|-------------|
| `GET` | `/api/v1/users` | Get all users (supports filtering by role) |
| `PATCH` | `/api/v1/users/:id` | Update any user |
| `DELETE` | `/api/v1/users/:id` | Delete any user |
| `POST` | `/api/v1/users/login` | Admin login |

**Get All Users:**
```
GET /api/v1/users
Authorization: Bearer <admin_token>
```

**Filter Users by Role:**
```
GET /api/v1/users?role=guide
Authorization: Bearer <admin_token>
```

**Update User:**
```json
PATCH /api/v1/users/68f25bdd0620339e94fcfb0f
Authorization: Bearer <admin_token>
Content-Type: application/json

{
  "role": "guide",
  "active": true
}
```

**Delete User:**
```
DELETE /api/v1/users/68f25bdc0620339e94fcfb0d
Authorization: Bearer <admin_token>
```

---

## 🔍 Query Features

The API supports advanced querying on collection endpoints (tours, reviews, users):

### 1. Filtering

Filter by any field using query parameters:

```
GET /api/v1/tours?difficulty=easy&duration[gte]=5
```

**Supported operators:**
- `[gte]` - Greater than or equal
- `[gt]` - Greater than
- `[lte]` - Less than or equal
- `[lt]` - Less than

**Example:**
```
GET /api/v1/tours?duration[gte]=5&difficulty=easy&price[lt]=1500
```

### 2. Sorting

Sort by one or multiple fields:

```
GET /api/v1/tours?sort=price
GET /api/v1/tours?sort=-price              # Descending
GET /api/v1/tours?sort=price,duration      # Multiple fields
GET /api/v1/tours?sort=ratingAverage,maxGroupSize
```

**Default**: Results are sorted by creation date (newest first)

### 3. Field Limiting (Projection)

Select only specific fields to reduce response size:

```
GET /api/v1/tours?fields=name,price,duration
GET /api/v1/tours?fields=-description,-images  # Exclude fields
```

**Example Response:**
```json
{
  "status": "success",
  "results": 9,
  "data": {
    "tours": [
      {
        "name": "The Forest Hiker",
        "price": 297,
        "duration": 5
      }
    ]
  }
}
```

### 4. Pagination

Paginate results with `page` and `limit`:

```
GET /api/v1/tours?page=2&limit=10
GET /api/v1/tours?page=1&limit=5
```

**Default**: `page=1`, `limit=100`

**Response includes:**
```json
{
  "status": "success",
  "results": 10,
  "data": {
    "tours": [...]
  }
}
```

### 5. Combining Features

Combine all query features:

```
GET /api/v1/tours?duration[gte]=5&difficulty=easy&sort=price&limit=10&fields=name,price,duration
```

This query:
- Filters tours with duration ≥ 5 days and easy difficulty
- Sorts by price (ascending)
- Limits to 10 results
- Returns only name, price, and duration fields

---

## 🧪 Testing & Scripts

### Pre-Request Scripts

The collection includes automated test data generation scripts:

#### Test Tour Generator

The "Post Test Tour" request includes a pre-request script that generates realistic test tours with:
- **50 realistic tour names** (e.g., "Fuji Mountain Climbing Expedition", "Amazon Rainforest Adventure")
- **Random durations** (1-14 days)
- **Random group sizes** (5-15 people)
- **Random prices** ($100-$5000)
- **Random difficulties** (easy, medium, difficult)
- **Randomized summaries and descriptions**

**Script excerpt:**
```javascript
const tourNames = [
    "Fuji Mountain Climbing Expedition",
    "Amazon Rainforest Adventure",
    "Grand Canyon Exploration",
    // ... 47 more names
];

function testTour() {
    const name = `${tourNames[Math.floor(Math.random() * tourNames.length)]} ${['Tour','Ride','Hike', 'Dive', 'Glide'][Math.floor(Math.random() * 5) + 1]}`;
    const duration = Math.floor(Math.random() * 14) + 1;
    const maxGroupSize = Math.floor(Math.random() * 10) + 5;
    // ... more randomization
}
```

### Post-Response Scripts

Automatically save important IDs to global variables:

```javascript
// Save tour ID after creation
pm.globals.set("globalTourId", pm.response.json().data.tour._id);

// Save user ID after signup
pm.globals.set("globalUserId", pm.response.json().data.user._id);

// Save auth token after login
pm.environment.set("token", pm.response.json().token);
```

### Running Tests

Use Postman's Collection Runner to:
1. Test all endpoints sequentially
2. Validate responses with test scripts
3. Generate test data automatically
4. Check authentication flows

---

## 📊 Example Responses

### Tour Response
```json
{
  "status": "success",
  "data": {
    "tour": {
      "_id": "5c88fa8cf4afda39709c2961",
      "name": "The Forest Hiker",
      "duration": 5,
      "maxGroupSize": 25,
      "difficulty": "easy",
      "ratingsAverage": 4.7,
      "ratingsQuantity": 37,
      "price": 397,
      "summary": "Breathtaking hike through the Canadian Banff National Park",
      "description": "Detailed description...",
      "imageCover": "tour-1-cover.jpg",
      "startLocation": {
        "type": "Point",
        "coordinates": [-115.570154, 51.178456],
        "address": "224 Banff Ave, Banff, AB, Canada",
        "description": "Banff, CAN"
      },
      "guides": [...],
      "startDates": [...]
    }
  }
}
```

### Review Response
```json
{
  "status": "success",
  "data": {
    "review": {
      "_id": "69007f4b95974f8a19cef020",
      "review": "Amazing tour! Highly recommended.",
      "rating": 5,
      "tour": "5c88fa8cf4afda39709c2955",
      "user": {
        "_id": "5c8a1d5b0190b214360dc057",
        "name": "John Doe",
        "photo": "user-1.jpg"
      },
      "createdAt": "2024-01-15T10:30:00.000Z"
    }
  }
}
```

### Error Response
```json
{
  "status": "fail",
  "message": "Invalid input data. Please provide valid tour information."
}
```

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
  "status": "fail",  // or "error" for server errors
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

- [Postman Collection]([link-to-postman-collection](https://github.com/C4S4BL4NC4/natours-express-api/tree/main/src/dev-data/postman)) - Import this collection to get started immediately
- [GitHub Repository](https://github.com/C4S4BL4NC4/natours-express-api) - Source code and additional notes

---

**NOTE: MY DOCUMENTATION WAS FULLY IMPLEMENTED WITH POSTMAN AND REFINED USING AI TOOLS.**
