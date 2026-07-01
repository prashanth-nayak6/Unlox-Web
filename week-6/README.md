# Blog REST API with CRUD Operations

This project is a production-ready Blog REST API built with Node.js and Express. It supports full CRUD operations, JWT authentication, Swagger documentation, search, pagination, and persistent JSON file storage.

## Project Overview

The API allows you to create, read, update, delete, search, and paginate blog posts. Data is stored in `data/posts.json`, so posts persist after server restarts.

## Features

- Create blog posts
- Get all blog posts
- Get a single blog post by ID
- Update blog posts
- Delete blog posts
- Search posts by title, content, author, or category
- Pagination support
- JWT authentication
- Swagger API documentation at `/api-docs`
- Centralized error handling
- File-based persistence using JSON

## Folder Structure

```text
week-6/
├── controllers/
│   ├── authController.js
│   └── postController.js
├── data/
│   └── posts.json
├── middleware/
│   ├── authenticate.js
│   ├── errorHandler.js
│   ├── notFound.js
│   └── validatePost.js
├── routes/
│   ├── authRoutes.js
│   └── postRoutes.js
├── services/
│   └── fileService.js
├── utils/
│   └── generateId.js
├── app.js
├── server.js
├── package.json
├── postman_collection.json
└── README.md
```

## Technologies Used

- Node.js
- Express.js
- cors
- dotenv
- jsonwebtoken
- swagger-ui-express
- swagger-jsdoc
- nodemon

## Installation Steps

1. Open a terminal in the `week-6` folder.
2. Install dependencies:

```bash
npm install
```

## Running the Server

Development mode:

```bash
npm run dev
```

Production mode:

```bash
npm start
```

The server runs on `http://localhost:3000` by default.

## Authentication Guide

Login endpoint:

```http
POST /auth/login
```

Default credentials:

- Username: `admin@example.com`
- Password: `password123`

The response returns a JWT token. Use it in the `Authorization` header for protected routes:

```http
Authorization: Bearer <token>
```

Protected routes:

- `POST /posts`
- `PUT /posts/:id`
- `DELETE /posts/:id`

Public routes:

- `GET /posts`
- `GET /posts/:id`
- `GET /posts/search`
- `GET /api-docs`

## API Endpoints

### Auth

| Method | Endpoint | Description |
| --- | --- | --- |
| POST | `/auth/login` | Generate JWT token |

### Posts

| Method | Endpoint | Description |
| --- | --- | --- |
| GET | `/posts` | Get all posts |
| GET | `/posts?page=1&limit=5` | Get paginated posts |
| GET | `/posts/:id` | Get a post by ID |
| GET | `/posts/search?q=react` | Search posts |
| POST | `/posts` | Create a post |
| PUT | `/posts/:id` | Update a post |
| DELETE | `/posts/:id` | Delete a post |

## Request Examples

### Login

```json
{
  "username": "admin@example.com",
  "password": "password123"
}
```

### Create Post

```json
{
  "title": "Building REST APIs with Express",
  "content": "Express simplifies REST API development.",
  "author": "Prashanth",
  "category": "Node.js"
}
```

### Update Post

```json
{
  "title": "Updated Title",
  "content": "Updated content",
  "author": "Prashanth",
  "category": "Backend"
}
```

## Response Examples

### Success Response

```json
{
  "success": true,
  "message": "Post created successfully",
  "data": {
    "id": "...",
    "title": "Building REST APIs with Express",
    "content": "Express simplifies REST API development.",
    "author": "Prashanth",
    "category": "Node.js",
    "createdDate": "2026-07-01T00:00:00.000Z"
  }
}
```

### Validation Error

```json
{
  "success": false,
  "message": "Title is required"
}
```

### Not Found Error

```json
{
  "success": false,
  "message": "Post not found"
}
```

## Testing Guide

1. Import `postman_collection.json` into Postman.
2. Call `POST /auth/login` to get a JWT token.
3. Save the token to the `token` variable in the collection.
4. Create a post and copy the returned `id` into the `postId` variable.
5. Test all CRUD, search, and pagination endpoints.

You can also verify Swagger docs at:

```text
/api-docs
```

## Deployment Guide

### Render

1. Push the project to GitHub.
2. Create a new Web Service on Render.
3. Select the repository and `week-6` project folder.
4. Set the build command to `npm install`.
5. Set the start command to `npm start`.
6. Add environment variables if needed:
   - `PORT`
   - `JWT_SECRET`
   - `ADMIN_USERNAME`
   - `ADMIN_PASSWORD`

### Railway

1. Create a new Railway project.
2. Deploy from GitHub.
3. Set the root directory to `week-6` if required.
4. Use `npm install` for install and `npm start` for start.
5. Add the same environment variables as needed.

## Deployment Ready Notes

- The app reads the port from `process.env.PORT`.
- The JWT secret can be configured with `JWT_SECRET`.
- Authentication credentials can be overridden with `ADMIN_USERNAME` and `ADMIN_PASSWORD`.
- JSON storage persists in `data/posts.json`.

## Postman Collection

Use `postman_collection.json` in the project root.
