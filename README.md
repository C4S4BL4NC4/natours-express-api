# Natours Express API

![Natours Banner](https://images.unsplash.com/photo-1506744038136-46273834b3fb?auto=format&fit=crop&w=1200&q=80)

A robust RESTful API for managing tours, users, reviews, and geospatial queries. Built with Node.js, Express, MongoDB, and Mongoose.

---

## Features

- User authentication & authorization (JWT, cookies)
- CRUD operations for tours, users, reviews
- Geospatial queries (find tours within radius, calculate distances)
- Data sanitization, security headers, rate limiting
- Custom error handling
- MongoDB aggregation for stats and plans

---

## Getting Started

### Prerequisites

- Node.js (v16+ recommended)
- MongoDB Atlas cluster or local MongoDB

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
EMAIL_USERNAME=your_mailtrap_username
EMAIL_PASSWORD=your_mailtrap_password
EMAIL_HOST=sandbox.smtp.mailtrap.io
EMAIL_PORT=25
MAILTRAP_TOKEN=your_mailtrap_token
```

### Running the App

```bash
npm start
# or for development with auto-reload
npm run dev
```

---

## API Endpoints

### Tours

- `GET /api/v1/tours` — List all tours
- `POST /api/v1/tours` — Create a tour (admin/lead-guide)
- `PATCH /api/v1/tours/:id` — Update a tour (admin/lead-guide)
- `DELETE /api/v1/tours/:id` — Delete a tour (admin/lead-guide)
- `GET /api/v1/tours/tours-within/:distance/center/:latlng/unit/:unit` — Find tours within radius
- `GET /api/v1/tours/distances/:latlng/unit/:unit` — Calculate distances from a point

### Users

- `POST /api/v1/users/signup` — Register
- `POST /api/v1/users/login` — Login
- `PATCH /api/v1/users/updateMyPassword` — Update password

### Reviews

- `GET /api/v1/reviews` — List all reviews
- `POST /api/v1/reviews` — Create a review (user)
- `PATCH /api/v1/reviews/:id` — Update a review (user/admin)
- `DELETE /api/v1/reviews/:id` — Delete a review (user/admin)

---

## Test Values

### Test User

```
Email: testuser@example.com
Password: testpass123
```

### Test JWT

```
Authorization: Bearer <your_jwt_token>
```

### Example Tour Document

```
{
  "name": "Grand Canyon Exploration Hike",
  "price": 1358,
  "duration": 11,
  "maxGroupSize": 7,
  "difficulty": "medium",
  "summary": "Experience the amazing Grand Canyon Exploration Hike with breathtaking views and unforgettable adventures",
  "imageCover": "grandcanyonexplorationhike.jpg",
  "startLocation": {
    "type": "Point",
    "coordinates": [-112.1401, 36.0544],
    "address": "Grand Canyon, AZ, USA",
    "description": "Main entrance"
  }
}
```

### Example Geospatial Query

```
GET /api/v1/tours/tours-within/50/center/36.0544,-112.1401/unit/mi
```

---

## Contributing

The whole idea of this project is for me to learn so it will not be open to third-party contributions.

---

## License

Free as in freedom, as in take fork it do whatever you want with it, its made for learning purposes.

---

## Credits

- [Jonas Schmedtmann's Node.js Bootcamp](https://www.udemy.com/course/nodejs-express-mongodb-bootcamp/)
- Unsplash for banner image
- Shout out to [Obsidian](https://obsidian.md/) for being a great note taking tool. Make sure to check [my notes](https://github.com/C4S4BL4NC4/natours-express-api/tree/main/obsidian/vaults) too. 

# NOTE: MY DOCUMENTATION WAS FULLY IMPLEMENTED WITH POSTMAN AND REFINED USING AI TOOLS.
