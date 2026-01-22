# WanderLust - Travel Listing Application

A full-stack travel listing application built with Node.js, Express, MongoDB, and React. This project has been converted from EJS templates to React for the frontend.

## 📋 Table of Contents

- [Project Overview](#project-overview)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Features](#features)
- [Demo Credentials](#demo-credentials)
- [Backend Routes](#backend-routes)
- [Frontend Pages](#frontend-pages)
- [Troubleshooting](#troubleshooting)

---

## 🎯 Project Overview

WanderLust is a travel listing platform where users can:
- Browse travel destinations/listings
- View detailed information about each listing
- Add new listings with images
- Edit and delete their own listings
- Leave reviews with star ratings
- User authentication (login/signup)

---

## 💻 Tech Stack

### Frontend (React)
- **React 18** with Vite
- **React Router v7** for routing
- **React Bootstrap 5** for UI components
- **Axios** for API calls
- **Leaflet** for maps
- **Font Awesome** for icons
- **Custom CSS** with Bootstrap theme

### Backend (Express)
- **Express.js** web framework
- **MongoDB** with Mongoose ODM
- **Passport.js** for authentication
- **Express Session** with MongoDB store
- **Connect-Flash** for flash messages
- **CORS** for cross-origin requests
- **Multer** for file uploads
- **Cloudinary** for image storage

---

## 📁 Project Structure

```
project/
├── app.js                    # Main Express application
├── package.json              # Backend dependencies
├── .env                      # Environment variables (create this)
│
├── client/                   # React Frontend
│   ├── package.json          # Frontend dependencies
│   ├── vite.config.js        # Vite configuration
│   ├── README.md             # Frontend documentation
│   │
│   ├── src/
│   │   ├── main.jsx          # App entry point
│   │   ├── App.jsx           # Main App component with routes
│   │   ├── index.css         # Global styles
│   │   │
│   │   ├── api/
│   │   │   └── axios.js      # Axios configuration & API methods
│   │   │
│   │   ├── context/
│   │   │   └── AuthContext.jsx  # Authentication context provider
│   │   │
│   │   ├── components/       # Reusable components
│   │   │   ├── Navbar.jsx
│   │   │   ├── Footer.jsx
│   │   │   ├── ListingCard.jsx
│   │   │   ├── StarRating.jsx
│   │   │   ├── FlashMessage.jsx
│   │   │   └── MapView.jsx
│   │   │
│   │   └── pages/            # Page components
│   │       ├── Home.jsx
│   │       ├── ListingDetail.jsx
│   │       ├── AddListing.jsx
│   │       ├── EditListing.jsx
│   │       ├── Login.jsx
│   │       └── Signup.jsx
│   │
│   └── dist/                 # Production build output
│
├── models/                   # Mongoose models
│   ├── Listing.js
│   ├── Review.js
│   └── user.js
│
├── routes/                   # Express routes
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── controllers/              # Route controllers
│   ├── listing.js
│   ├── review.js
│   └── user.js
│
├── middleware/               # Custom middleware
│   └── middleware.js
│
├── utils/                    # Utility functions
│   ├── ExpressError.js
│   └── wrapAsync.js
│
├── init/                     # Database seeding
│   ├── index.js
│   └── data.js
│
├── public/                   # Static files (for EJS fallback)
│   ├── css/
│   ├── js/
│   └── images/
│
└── views/                    # EJS templates (for fallback)
    ├── layout/
    ├── listings/
    ├── users/
    └── includes/
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **MongoDB** (local or Atlas)
- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   cd /Users/hariharaacharya/Desktop/project
   ```

2. **Install backend dependencies**
   ```bash
   npm install
   ```

3. **Install frontend dependencies**
   ```bash
   cd client
   npm install
   cd ..
   ```

4. **Start MongoDB**
   ```bash
   mongod
   ```

5. **Start the backend server** (Terminal 1)
   ```bash
   node app.js
   # Server runs on http://localhost:8081
   ```

6. **Start the frontend dev server** (Terminal 2)
   ```bash
   cd client
   npm run dev
   # React app runs on http://localhost:5173
   ```

7. **Open your browser**
   Navigate to: **http://localhost:5173**

---

## 🔐 Environment Variables

Create a `.env` file in the project root:

```env
# MongoDB Connection
ATLASDB_URL=mongodb://127.0.0.1:27017/wonderlust
# OR use MongoDB Atlas:
# ATLASDB_URL=mongodb+srv://username:password@cluster.mongodb.net/wonderlust

# Session Secret (any long random string)
SECRET=your-super-secret-session-key-here

# Cloudinary (for image uploads - optional)
CLOUDINARY_CLOUD_NAME=your-cloud-name
CLOUDINARY_KEY=your-api-key
CLOUDINARY_SECRET=your-api-secret
```

---

## 🌐 API Endpoints

### Listings API (JSON)

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/listings` | Get all listings |
| GET | `/api/listings/:id` | Get single listing |
| POST | `/listing` | Create new listing (with image) |
| PUT | `/listing/:id` | Update listing |
| DELETE | `/api/listings/:id` | Delete listing |

### Reviews API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/listing/:id/reviews` | Add review |
| DELETE | `/listing/:id/reviews/:reviewId` | Delete review |

### Authentication API

| Method | Endpoint | Description |
|--------|----------|-------------|
| POST | `/api/login` | User login |
| POST | `/api/signup` | User signup |
| POST | `/api/logout` | User logout |
| GET | `/api/checkauth` | Check authentication status |

---

## ✨ Features

### Core Features
- ✅ Browse all travel listings
- ✅ View detailed listing information
- ✅ Add new listings with image upload
- ✅ Edit/delete own listings
- ✅ User authentication (login/signup)
- ✅ Leave reviews with star ratings
- ✅ Delete own reviews
- ✅ Interactive maps with OpenStreetMap
- ✅ Responsive design with Bootstrap 5
- ✅ Flash messages for user feedback

### Technical Features
- ✅ React frontend with Vite
- ✅ REST API with Express
- ✅ MongoDB database
- ✅ Session-based authentication
- ✅ CORS enabled for React
- ✅ File upload with Multer
- ✅ Image storage with Cloudinary
- ✅ Production build support

---

## 👤 Demo Credentials

**Existing User:**
```
Username: delta-student
Password: helloworld
```

**To create a new user:**
1. Click "Sign Up" on the navbar
2. Enter username, email, and password
3. Click "Sign Up" - you'll be automatically logged in

---

## 🔧 Backend Routes

### Listing Routes (`/listing`)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/` | Render all listings (EJS fallback) |
| GET | `/new` | Render add listing form |
| GET | `/:id` | Render listing detail (EJS) |
| GET | `/:id/edit` | Render edit form (EJS) |
| POST | `/` | Create new listing |
| PUT | `/:id` | Update listing |
| DELETE | `/:id` | Delete listing |

### User Routes (`/`)

| Method | Route | Description |
|--------|-------|-------------|
| GET | `/login` | Render login page (EJS) |
| GET | `/signup` | Render signup page (EJS) |
| POST | `/login` | Process login |
| POST | `/signup` | Process signup |
| POST | `/logout` | Process logout |

---

## 📄 Frontend Pages

| Route | Component | Description |
|-------|-----------|-------------|
| `/listing` | Home | Display all listings |
| `/listing/:id` | ListingDetail | Show listing details & reviews |
| `/listing/new` | AddListing | Add new listing form |
| `/listing/:id/edit` | EditListing | Edit listing form |
| `/login` | Login | Login form |
| `/signup` | Signup | Signup form |

---

## 🛠️ Troubleshooting

### Port Already in Use

If you get an error about port 8081 or 5173 being in use:

**For backend:**
```bash
# Find and kill the process
lsof -i :8081
kill -9 <PID>
```

**For frontend:**
```bash
# Vite will automatically try another port
cd client && npm run dev
```

### MongoDB Connection Issues

1. Make sure MongoDB is running:
   ```bash
   mongod
   ```

2. Check your `.env` file has the correct MongoDB URL

3. For local MongoDB:
   ```env
   ATLASDB_URL=mongodb://127.0.0.1:27017/wonderlust
   ```

### CORS Errors

If you see CORS errors in the browser console:

1. Make sure CORS is configured in `app.js`
2. The React app should be configured to use `withCredentials: true`

### Images Not Loading

1. Check Cloudinary configuration in `.env`
2. Verify the image URL in the database is valid
3. Check browser console for 404 errors

### Authentication Issues

1. Clear browser cookies and localStorage
2. Restart both servers
3. Try logging out and logging back in

---

## 📦 Build for Production

To create a production build of the React app:

```bash
cd client
npm run build
```

The build output will be in `client/dist/`, which can be served by the Express app or deployed to any static hosting service.

---

## 📝 License

This project is licensed under the ISC License.

---

## 👨‍💻 Author

Harihara Acharya

---

## 🙏 Acknowledgments

- [Bootstrap](https://getbootstrap.com/) for the UI framework
- [React](https://reactjs.org/) for the frontend library
- [Express](https://expressjs.com/) for the backend framework
- [MongoDB](https://www.mongodb.com/) for the database
- [Leaflet](https://leafletjs.com/) for maps
- [Font Awesome](https://fontawesome.com/) for icons
- [Cloudinary](https://cloudinary.com/) for image storage

