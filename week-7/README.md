# SocialApp — Full Stack Social Media Application

A full stack social media web app built with the **MERN stack** (MongoDB, Express, React, Node.js). Users can register, log in, create posts with optional images, like/comment on posts, follow other users, and toggle dark mode.

---

## Project Overview

SocialApp is a Week 07 minor project demonstrating full stack development: a React frontend communicating with a Node/Express REST API backed by MongoDB, secured with JWT authentication.

---

## Features Implemented

**Authentication**
- User registration with validation
- User login with JWT issuance
- Logout (client-side token removal + server endpoint)
- Protected routes (frontend `ProtectedRoute` + backend `protect` middleware)
- Password hashing with bcrypt

**User Profile**
- View any user's profile (bio, avatar, follower/following counts)
- Edit own profile (name, bio, profile picture upload)

**Posts**
- Create text posts with optional image upload
- View global feed (paginated, newest first)
- View single post
- Edit own posts
- Delete own posts (cascades to delete associated comments)

**Post Interactions**
- Like / Unlike posts
- Comment on posts
- Delete own comments

**Bonus Features**
- 🖼️ Image uploads (post images + profile pictures) via Multer
- 💬 Comments system
- 🌓 Dark mode (persisted, respects system preference)
- 👥 Follow / Unfollow users

**Responsive UI**
- Mobile, tablet, and desktop friendly layout using Tailwind CSS

---

## Technologies Used

**Frontend:** React 18, React Router v6, Axios, Tailwind CSS, Vite
**Backend:** Node.js, Express.js, MongoDB, Mongoose, JWT, bcryptjs, Multer
**Dev tools:** Nodemon

---

## Project Structure

```
social-app/
├── backend/
│   ├── config/db.js
│   ├── models/ (User, Post, Comment)
│   ├── middleware/ (auth, error, upload)
│   ├── controllers/ (auth, user, post, comment)
│   ├── routes/ (auth, user, post, comment)
│   ├── uploads/            # uploaded images served statically
│   ├── server.js
│   └── .env.example
└── frontend/
    ├── src/
    │   ├── components/ (Navbar, PostCard, PostForm, CommentList, ProtectedRoute)
    │   ├── pages/ (Login, Register, Feed, Profile, EditProfile)
    │   ├── context/ (AuthContext, ThemeContext)
    │   ├── services/api.js
    │   ├── App.jsx
    │   └── main.jsx
    └── .env.example
```

---

## Installation Guide

### Prerequisites
- Node.js v18+
- MongoDB running locally or a MongoDB Atlas connection string

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd social-app
```

### 2. Backend setup
```bash
cd backend
npm install
cp .env.example .env
# edit .env with your own values (see below)
npm run dev
```
The API runs at `http://localhost:5000`.

### 3. Frontend setup
```bash
cd frontend
npm install
cp .env.example .env
npm run dev
```
The app runs at `http://localhost:5173`.

---

## Environment Variables Required

**backend/.env**
| Variable | Description | Example |
|---|---|---|
| `PORT` | Port the API server runs on | `5000` |
| `MONGO_URI` | MongoDB connection string | `mongodb://localhost:27017/social-app` |
| `JWT_SECRET` | Secret key used to sign JWTs | `a_long_random_string` |
| `JWT_EXPIRES_IN` | JWT expiry duration | `7d` |
| `CLIENT_URL` | Frontend origin for CORS | `http://localhost:5173` |

**frontend/.env**
| Variable | Description | Example |
|---|---|---|
| `VITE_API_URL` | Base URL of the backend API | `http://localhost:5000/api` |

---

## API Documentation

Base URL: `http://localhost:5000/api`

### Auth
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/auth/register` | Public | Register a new user `{ name, email, password }` |
| POST | `/auth/login` | Public | Login `{ email, password }` → returns JWT |
| POST | `/auth/logout` | Private | Logout current user |
| GET | `/auth/me` | Private | Get currently authenticated user |

### Users
| Method | Endpoint | Access | Description |
|---|---|---|---|
| GET | `/users/:id` | Private | Get a user's profile |
| PUT | `/users/profile` | Private | Update own profile (`name`, `bio`, `profilePicture` file) |
| POST | `/users/:id/follow` | Private | Follow a user |
| POST | `/users/:id/unfollow` | Private | Unfollow a user |

### Posts
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/posts` | Private | Create a post (`content`, optional `image` file) |
| GET | `/posts` | Private | Get all posts, paginated (`?page=1&limit=20`) |
| GET | `/posts/:id` | Private | Get a single post |
| PUT | `/posts/:id` | Private | Update own post |
| DELETE | `/posts/:id` | Private | Delete own post |
| POST | `/posts/:id/like` | Private | Like a post |
| POST | `/posts/:id/unlike` | Private | Unlike a post |

### Comments
| Method | Endpoint | Access | Description |
|---|---|---|---|
| POST | `/posts/:postId/comments` | Private | Add a comment `{ text }` |
| GET | `/posts/:postId/comments` | Private | Get all comments for a post |
| DELETE | `/comments/:id` | Private | Delete own comment |

All private routes require an `Authorization: Bearer <token>` header.

---

## Notes on Deployment

- Frontend can be deployed to Vercel/Netlify (set `VITE_API_URL` to your deployed backend URL).
- Backend can be deployed to Render/Railway (set `MONGO_URI` to a MongoDB Atlas cluster, and `CLIENT_URL` to the deployed frontend URL).
- Uploaded images are stored on local disk in `backend/uploads` and served at `/uploads/<filename>`; for production, consider swapping this for cloud storage (e.g., Cloudinary or S3).

---

## Author's Notes
Built to satisfy the Week 07 Minor Project requirements: full stack integration, REST API + CRUD, authentication & authorization, database relationships, responsive UI, and clean code organization, with the Image Upload, Comments, Follow/Unfollow, and Dark Mode bonus features included.
