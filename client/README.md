# WanderLust - React Frontend Conversion

This project has been converted from EJS templates to React.

## Project Structure

```
client/                 # React Frontend (Vite + React)
├── src/
│   ├── api/           # Axios configuration
│   ├── components/    # Reusable components
│   │   ├── Navbar.jsx
│   │   ├── Footer.jsx
│   │   ├── ListingCard.jsx
│   │   ├── StarRating.jsx
│   │   ├── FlashMessage.jsx
│   │   └── MapView.jsx
│   ├── context/       # React Context
│   │   └── AuthContext.jsx
│   ├── pages/         # Page components
│   │   ├── Home.jsx
│   │   ├── ListingDetail.jsx
│   │   ├── AddListing.jsx
│   │   ├── EditListing.jsx
│   │   ├── Login.jsx
│   │   └── Signup.jsx
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
└── dist/              # Production build
```

## Getting Started

### 1. Start MongoDB
```bash
mongod
```

### 2. Start the Backend Server
```bash
cd /Users/hariharaacharya/Desktop/project
node app.js
# Server runs on http://localhost:8081
```

### 3. Start the React Frontend
```bash
cd /Users/hariharaacharya/Desktop/project/client
npm run dev
# React app runs on http://localhost:5173
```

## Features

- **Authentication**: Login/Signup with Passport.js
- **Listings**: View, add, edit, delete travel listings
- **Reviews**: Add and delete reviews with star ratings
- **Maps**: Location display using OpenStreetMap
- **Responsive**: Bootstrap 5 + custom CSS
- **Flash Messages**: User feedback notifications

## Tech Stack

### Frontend
- React 18 + Vite
- React Router v7
- React Bootstrap 5
- Axios
- Leaflet Maps
- Font Awesome Icons

### Backend
- Express.js
- MongoDB + Mongoose
- Passport.js (Local Strategy)
- Connect-Mongo (Session Store)
- CORS
- Multer (File Upload)

## API Endpoints

### Listings
- `GET /listing` - Get all listings
- `GET /listing/:id` - Get single listing
- `POST /listing` - Create listing (multipart/form-data)
- `PUT /listing/:id` - Update listing
- `DELETE /listing/:id` - Delete listing

### Reviews
- `POST /listing/:id/reviews` - Add review
- `DELETE /listing/:id/reviews/:reviewId` - Delete review

### Authentication
- `POST /api/login` - Login
- `POST /api/signup` - Signup
- `POST /api/logout` - Logout
- `GET /api/checkauth` - Check authentication status

## Environment Variables

Create a `.env` file in the project root:

```env
ATLASDB_URL=mongodb://127.0.0.1:27017/wonderlust
SECRET=your-secret-key-here
```

## Notes

- The React frontend runs on port 5173
- The Express backend runs on port 8081
- CORS is configured to allow requests from http://localhost:5173
- Session-based authentication with JWT token storage
- Images are uploaded to Cloudinary (configured in backend)

