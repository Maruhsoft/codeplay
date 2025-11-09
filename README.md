# Full-Stack Scaffold Project

A full-stack practice project for generating backend and frontend scaffolds using **Plop.js** and **JSON Server**. This setup allows rapid creation of CRUD endpoints, React components, hooks, and services for any resource.

---

## Table of Contents

- [Project Setup](#project-setup)  
- [Installing Dependencies](#installing-dependencies)  
- [Running JSON Server](#running-json-server)  
- [Backend Setup](#backend-setup)  
- [Using Plop Generators](#using-plop-generators)  
  - [Backend Resource](#backend-resource)  
  - [Frontend Resource](#frontend-resource)  
- [Testing the Request/Response Cycle](#testing-the-requestresponse-cycle)  
- [Folder Structure](#folder-structure)  
- [Tips & Notes](#tips--notes)  
- [Example Workflow](#example-workflow)

---

## Project Setup

Clone the repository:

```bash
git clone <your-repo-url>
cd <your-project-folder>
````

Install dependencies:

```bash
npm install
```

Ensure you have **Node.js (v16+)** installed.

---

## Installing Dependencies

Install required packages:

```bash
npm install express axios morgan cors
npm install --save-dev plop json-server
```

* **Express** – backend framework
* **Axios** – HTTP client for frontend and backend services
* **Morgan** – logging middleware for Express
* **CORS** – allow cross-origin requests
* **Plop.js** – code scaffolding tool
* **JSON Server** – fake REST API for development

---

## Running JSON Server

1. Ensure you have a `db.json` file in the project root. Example:

```json
{
  "users": [
    { "id": 1, "name": "Alice", "email": "alice@example.com" },
    { "id": 2, "name": "Bob", "email": "bob@example.com" }
  ],
  "posts": [
    { "id": 1, "title": "Hello World", "content": "This is a post" }
  ]
}
```

2. Start JSON Server:

```bash
npx json-server --watch db.json --port 4000
```

* API available at `http://localhost:4000`
* Example endpoint: `GET http://localhost:4000/users`

---

## Backend Setup

### Create `app.js`

Plop modifies `app.js`, so it must exist:

```js
// src/backend/app.js
import express from 'express';
import cors from 'cors';
import morgan from 'morgan';

const app = express();

app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// Routes
// This comment line is required for Plop to insert new routes

// Root health-check
app.get('/', (req, res) => {
  res.send('API is running');
});

export default app;
```

### Create `server.js`

```js
// src/backend/server.js
import app from './app.js';

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
```

---

## Using Plop Generators

Run Plop:

```bash
npx plop
```

Select the generator `resource` and enter a resource name (e.g., `user`).

### Backend Resource

Plop will generate:

* `src/backend/models/User.js`
* `src/backend/services/userService.js`
* `src/backend/controllers/userController.js`
* `src/backend/routes/userRoutes.js`
* Auto-import route in `src/backend/app.js`

### Frontend Resource

The same generator also scaffolds frontend layers:

* `src/frontend/components/User/User.jsx`
* `src/frontend/components/User/User.css`
* `src/frontend/hooks/useUser.js`
* `src/frontend/services/userService.js`

---

## Testing the Request/Response Cycle

1. Start backend server:

```bash
node src/backend/server.js
```

2. Ensure JSON Server is running:

```bash
npx json-server --watch db.json --port 4000
```

3. Test endpoints:

* `GET /api/users` → fetch all users
* `POST /api/users` → add new user
* `PUT /api/users/:id` → update user
* `DELETE /api/users/:id` → delete user

4. Frontend service calls can point to `http://localhost:4000/users` via Axios.

---

## Folder Structure

```
project-root/
│
├── db.json
├── package.json
├── plopfile.js
├── plop-templates/
│   ├── model.hbs
│   ├── service.hbs
│   ├── controller.hbs
│   ├── route.hbs
│   ├── component.hbs
│   ├── component-style.hbs
│   ├── hook.hbs
│   └── index.hbs
│
├── src/
│   ├── backend/
│   │   ├── app.js
│   │   ├── server.js
│   │   ├── models/
│   │   ├── services/
│   │   ├── controllers/
│   │   ├── routes/
│   │   └── middlewares/
│   │
│   └── frontend/
│       ├── components/
│       ├── hooks/
│       └── services/
│
└── scripts/
    └── generate-services.js
```

---

## Tips & Notes

* Keep `db.json` updated with new resources; Plop can generate services for all top-level keys.
* For adding more frontend layers (pages, additional hooks), create new `.hbs` templates and add corresponding Plop actions.
* Use Postman or Insomnia to quickly test backend endpoints.
* Plop generators are idempotent — they won’t overwrite existing files unless `force: true` is set.
* Naming conventions:

  * `{{pascalCase name}}` → Component, Model, function/class names
  * `{{camelCase name}}` → service functions, controller imports
  * `{{dashCase name}}` → RESTful route paths (`/api/users`)

---

## Example Workflow

1. Start JSON Server:

```bash
npx json-server --watch db.json --port 4000
```

2. Generate a new resource:

```bash
npx plop
# Select "resource" → enter "post"
```

3. Start backend server:

```bash
node src/backend/server.js
```

4. Access API endpoints:

```bash
GET http://localhost:5000/api/posts
POST http://localhost:5000/api/posts
PUT http://localhost:5000/api/posts/:id
DELETE http://localhost:5000/api/posts/:id
```

5. Frontend files available in:

```
src/frontend/components/Post/
src/frontend/hooks/usePost.js
src/frontend/services/postService.js
```

---

This setup allows you to:

1. Rapidly generate backend and frontend scaffolds.
2. Test request/response cycles against a mock JSON Server API.
3. Maintain a consistent architecture and naming convention.

```
